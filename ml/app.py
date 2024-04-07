import base64
from flask import Flask, request, jsonify
import json, time
from PIL import Image
import cv2
import numpy as np
import io
from diffusers import StableDiffusionControlNetPipeline, ControlNetModel
import torch
from diffusers import UniPCMultistepScheduler
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
import torchvision.transforms as transforms
from torchvision.datasets import ImageFolder
from torch.utils.data import DataLoader
from torchvision.models import resnet50
import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
import json
with open('attractions.json', 'r') as f:
  attractions_dict = json.load(f)
print(attractions_dict)

"""
class_to_str_dict = {'Cathedral basilica of st. joseph': 0, 'Hearst Castle': 1, 'Japanese Friendship Garden': 2, 'Lick Observatory': 3, 'Rosicrucian Egyptian': 4, 'Tech Interactive Musuem': 5, 'Viet Musuem': 6, 'Winchester Mystery House': 7}
str_to_class_dict = {(v, k) for k, v in class_to_str_dict.items()}
"""

# preparing classifier embeddings
# Load pretrained ResNet model
resnet = resnet50(pretrained=True)
# Remove the classification layer (the last fully connected layer)
resnet = torch.nn.Sequential(*(list(resnet.children())[:-1]))
# Set model to evaluation mode
resnet.eval()

# Assuming you have a dataset stored in 'landmark_pics' folder
transform = transforms.Compose([
    transforms.Resize((224, 224)),  # Resize images to fit ResNet input size
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalize images
])
dataset = ImageFolder(root='landmark_pics', transform=transform)
print(dataset.targets)
print(dataset.class_to_idx)

class_to_str_dict = dataset.class_to_idx
str_to_class_dict = {v: k for k, v in class_to_str_dict.items()}
str_to_class_dict[-1] = "num of similarity images below threshold"


dataloader = DataLoader(dataset, batch_size=32, shuffle=False)

# Extract image embeddings using the pretrained ResNet model
embeddings = []
with torch.no_grad():
    for images, _ in dataloader:
        features = resnet(images)
        embeddings.append(features.squeeze())  # Remove the batch dimension

# Concatenate embeddings
embeddings = torch.cat(embeddings)

# Now embeddings contain the image embeddings extracted by ResNet
print("Shape of embeddings:", embeddings.shape)

# Convert embeddings to numpy array
embeddings_np = embeddings.numpy()

def load_image_as_bytes(file_path):
    with open(file_path, 'rb') as file:
        image_bytes = file.read()
    return image_bytes

def load_image_from_bytes(image_bytes):
    image = Image.open(io.BytesIO(image_bytes))
    return image

def bytes_to_numpy(image_bytes): 
    image = numpy.array(Image.open(io.BytesIO(image_bytes)))
    return image

def bytes_to_image(image_bytes): 
    image = Image.open(io.BytesIO(image_bytes))
    return image

def image_to_bytes(image):
    img_bytes_io = io.BytesIO()
    image.save(img_bytes_io, format='JPEG')
    img_bytes = img_bytes_io.getvalue()
    return img_bytes

def canny_image(original_image):

    image = np.array(original_image)

    low_threshold = 100
    high_threshold = 200

    image = cv2.Canny(image, low_threshold, high_threshold)
    image = image[:, :, None]
    image = np.concatenate([image, image, image], axis=2)
    canny_image = Image.fromarray(image)
    return canny_image


def load_img2img():
    controlnet = ControlNetModel.from_pretrained("lllyasviel/sd-controlnet-canny", torch_dtype=torch.float16)
    pipe = StableDiffusionControlNetPipeline.from_pretrained(
            "runwayml/stable-diffusion-v1-5", controlnet=controlnet, torch_dtype=torch.float16)
    pipe.scheduler = UniPCMultistepScheduler.from_config(pipe.scheduler.config)     
    pipe.enable_model_cpu_offload()
    return pipe

def style_transfer_img(model, canny_image, prompt):
    output = model(
    prompt, image=canny_image).images[0]
    print(type(output))
    output.save("controlnet_out.jpg")
    return output


def load_llm():
    # specify how to quantize the model
    quantization_config = BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=torch.float16)

    model = AutoModelForCausalLM.from_pretrained("mistralai/Mistral-7B-Instruct-v0.2", quantization_config=quantization_config, device_map="auto")
    tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-Instruct-v0.2")
    return model, tokenizer

def generate_riddle(model, tokenizer, place, context):
    messages = [
        {"role": "user", "content": f"You are a helpful assistant that is able to generate riddles that someone must solve to guess the answer which is {place}, without revealing obvious clues or the name of the place. Generate a riddle based on some context given below, without revealing the answer. Context: {context}"}]
    model_inputs = tokenizer.apply_chat_template(messages, return_tensors="pt").to("cuda")
    generated_ids = model.generate(model_inputs, max_new_tokens=200, do_sample=True)
    return tokenizer.batch_decode(generated_ids)[0].split("[/INST]")[1].strip("</s>")



def generate_hint(model, tokenizer, place, context, riddle):
    messages = [
            {"role": "user", "content": f"You sole purpose is to generate only a one sentence hint to help someone to guess the answer to the given riddle which is the {place}, without revealing the name of the place. Context: {context}, Riddle: {riddle}.\n Generate a short one sentence hint based on the context and the riddle given above without revealing the answer."}]
     
    model_inputs = tokenizer.apply_chat_template(messages, return_tensors="pt").to("cuda")
    generated_ids = model.generate(model_inputs, max_new_tokens=250, do_sample=True)
    return tokenizer.batch_decode(generated_ids)[0].split("[/INST]")[1].strip("</s>")

def convert_bytes_to_stylised_img(model, image_bytes, style):
    # convert from bytes to image
    img = bytes_to_image(image_bytes)
    # convert from image to canny
    canny_img = canny_image(img)
    # model takes in prompt, canny
    out_img = style_transfer_img(model, canny_img, style) 
    return out_img




llm, tokenizer = load_llm()
img2img =  load_img2img()

""""
context = "The Golden Gate Bridge is a suspension bridge spanning the Golden Gate, the one-mile-wide (1.6 km) strait connecting San Francisco Bay and the Pacific Ocean. The structure links the U.S. city of San Francisco, California the northern tip of the San Francisco Peninsula to Marin County, carrying both U.S. Route 101 and California State Route 1 across the strait. It also carries pedestrian and bicycle traffic, and is designated as part of U.S. Bicycle Route 95. Recognized by the American Society of Civil Engineers as one of the Wonders of the Modern World,[7] the bridge is one of the most internationally recognized symbols of San Francisco and California."



style = "fantasy"


image_bytes =  load_image_as_bytes("images/golden_gate.jpg")

convert_bytes_to_stylised_img(img2img, image_bytes, style).show()

context = "The Golden Gate Bridge is a suspension bridge spanning the Golden Gate, the one-mile-wide (1.6 km) strait connecting San Francisco Bay and the Pacific Ocean. The structure links the U.S. city of San Francisco, California the northern tip of the San Francisco Peninsula to Marin County, carrying both U.S. Route 101 and California State Route 1 across the strait. It also carries pedestrian and bicycle traffic, and is designated as part of U.S. Bicycle Route 95. Recognized by the American Society of Civil Engineers as one of the Wonders of the Modern World,[7] the bridge is one of the most internationally recognized symbols of San Francisco and California."
place = "Golden Gate Bridge"

riddle = generate_riddle(llm, tokenizer, place, context)
print(riddle)
hint = generate_hint(llm, tokenizer, place, context, riddle)
print(hint)
"""


app = Flask(__name__)

@app.route('/', methods = ['GET'])
def home_page():
    data_set = {'Page': 'Home', 'Message': 'successsfully loaded the home page', 'Timestamp': time.time()}
    json_dump = json.dumps(data_set)

    return json_dump


@app.route('/riddle_generator/', methods = ['POST'])
def riddle_generator():
    data = request.json
    location = data["location"] 
    context = attractions_dict[location]
    res = generate_riddle(llm, tokenizer, location, context)

    return jsonify({"message": "Data processed successfully", "result": res})

@app.route('/hint_generator/', methods = ['POST'])
def hint_generator():
    data = request.json
    location = data["location"]
    context = attractions_dict[location]
    riddle = data["riddle"]
    res = generate_hint(llm, tokenizer, location, context, riddle)
    return jsonify({"message": "Data processed successfully", "result": res})

@app.route('/image_classifier/', methods = ['POST'])
def image_classifier():

    location = request.form.get('location')
    image_file = request.files.get('image')
    print(location)
    image_bytes = image_file.read()
    print(image_bytes)
    # reset pointer to top of image to to read it again/calclate bytes, etc.
    image_file.seek(0)
    print(f"Received image: {image_file.filename}, size: {len(image_file.read())} bytes")
    res = "true"
    new_image = bytes_to_image(image_bytes)

    # new_image_path = 'landmark_pics/Cathedral basilica of st. joseph/63c8f9b6a35469896c41b28d8d3d828e.jpg'
    # new_image = Image.open(new_image_path)
    
    # Preprocess the image
    transform = transforms.Compose([
    transforms.Resize((224, 224)),  # Resize images to fit ResNet input size
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalize images
    ])
    new_image_tensor = transform(new_image)
    new_image_tensor = new_image_tensor.unsqueeze(0)  # Add batch dimension

    # Extract embedding for the new image using the pretrained ResNet model
    with torch.no_grad():
        resnet.eval()
        new_embedding = resnet(new_image_tensor).squeeze().numpy()


    new_np_embedding = np.array(new_embedding)



    x = 10  # You can change this to select a different number of neighbors
    threshold_none = 5
    
    # Compute cosine similarity between test sample and all training images
    similarities = cosine_similarity(new_np_embedding.reshape(1, -1), embeddings_np)

    # Flatten the similarities array
    similarities_flat = similarities.flatten()

    # Sort indices based on similarity
    nearest_indices = similarities_flat.argsort()[::-1]

    # Select the top x nearest neighbors
    top_x_indices = nearest_indices[:x]

    # Get the labels of the top x nearest neighbors
    nearest_labels = np.array(dataset.targets)[top_x_indices]

    # Use a simple voting scheme to determine the predicted label
    label_counts = np.bincount(nearest_labels)
    predicted_label = np.argmax(label_counts)

    if max(label_counts) <= threshold_none:
        predicted_label = -1
    print(predicted_label)
    predicted_location = str_to_class_dict[predicted_label] 
    if predicted_location == location:
        res = "true"
    else:
        false
    # Return the response in JSON format
    return jsonify({"message": "Data processed successfully", "result": res})


@app.route('/image_translator/', methods = ['POST'])
def image_translator():
    style = request.form.get('style')
    image_file = request.files.get('image')
    print(style)
    image_bytes = image_file.read()
    print(image_bytes)
    # reset pointer to top of image to to read it again/calclate bytes, etc.
    image_file.seek(0)
    print(f"Received image: {image_file.filename}, size: {len(image_file.read())} bytes")
    bytes_output_image = image_to_bytes(convert_bytes_to_stylised_img(img2img, image_bytes, style))

    encoded_image = base64.b64encode(bytes_output_image).decode('utf-8')

    # Return the response in JSON format
    return jsonify({"message": "Data processed successfully", "result": encoded_image})



if __name__ == '__main__':
    app.run(port=7711)
