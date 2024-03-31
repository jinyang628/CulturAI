from flask import Flask, request, jsonify
import json, time
from PIL import Image
import cv2
import numpy as np
import io
#from diffusers import StableDiffusionControlNetPipeline, ControlNetModel
#import torch
#from diffusers import UniPCMultistepScheduler
#from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig

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

def bytes_to_Image(image_bytes): 
    image = Image.open(io.BytesIO(image_bytes))
    return image

def Image_to_bytes(image):
    bytesarray = bytes(image.tobytes())
    return bytesarray

def prepare_img():
    original_image = load_image(url)

    image = np.array(original_image)

    low_threshold = 100
    high_threshold = 200

    image = cv2.Canny(image, low_threshold, high_threshold)
    image = image[:, :, None]
    image = np.concatenate([image, image, image], axis=2)
    canny_image = Image.fromarray(image)
    return canny_image

"""
def load_img2img():

    controlnet = ControlNetModel.from_pretrained("lllyasviel/sd-controlnet-canny", torch_dtype=torch.float16)
    pipe = StableDiffusionControlNetPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5", controlnet=controlnet, torch_dtype=torch.float16)

    pipe.scheduler = UniPCMultistepScheduler.from_config(pipe.scheduler.config)
    pipe.enable_model_cpu_offload()
    return pipe

def style_transfer_img(model, prompt):
    output = pipe(
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

def generate_riddle(model, tokenizer, context):
    messages = [
        {"role": "user", "content": f"You are a helpful assistant that is able to generate riddles that someone must solve to guess the location of a place, without revealing too many clues. You generate a riddle based on some context given below. Context: {context}"}]
    model_inputs = tokenizer.apply_chat_template(messages, return_tensors="pt").to("cuda")
    generated_ids = model.generate(model_inputs, max_new_tokens=200, do_sample=True)
    return tokenizer.batch_decode(generated_ids)


llm, tokenizer = load_llm()
img2img =  load_img2img()
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
    print(location)
    res = "riddle"
    return jsonify({"message": "Data processed successfully", "result": res})

@app.route('/hint_generator/', methods = ['POST'])
def hint_generator():
    data = request.json
    location = data["location"]
    riddle = data["riddle"]
    res = "hint"

    return jsonify({"message": "Data processed successfully", "result": res})

@app.route('/image_classifier', methods = ['POST'])
def image_classifier():
    data = request.json
    # Your data processing logic here...
    # res = generate_text_demo(f"""{data["input"]}""")
    location = data["location"]

    res = "true"

    # Return the response in JSON format
    return jsonify({"message": "Data processed successfully", "result": res})


@app.route('/image_translator', methods = ['POST'])
def image_translator():
    data = request.json
    data["image"] = image
    # Your data processing logic here...
    # res = generate_text_demo(f"""{data["input"]}""")

    res = load_image_as_bytes("images/golden_gate.jpg") 


    # Return the response in JSON format
    return jsonify({"message": "Data processed successfully", "result": res})



if __name__ == '__main__':
    app.run(port=7711)
