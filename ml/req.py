import requests
from PIL import Image
import io
import base64

base_url = 'http://127.0.0.1:7711'

url = base_url + '/riddle_generator/'  # Change this URL if needed

query = """Cathedral Basilica of St. Joseph"""
data = {"location": query}  

response = requests.post(url, json=data)
print(response.json())
riddle = response.json()["result"]
print(type(riddle))



url = base_url + '/hint_generator/'  # Change this URL if needed

data_hint = {"location": query, "riddle": riddle} 

response = requests.post(url, json=data_hint)
print(response.json())



url = base_url + '/image_classifier/'  # Change this URL if needed

# Path to the image file
image_path = 'landmark_pics/Cathedral Basilica of St. Joseph/cathedral_basilica_of_st_joseph_getty_plXssBa.jpg'

# Open the image file
with open(image_path, 'rb') as f:
    # Create a dictionary with the data to be sent in the request
    data = {'location': 'Cathedral Basilica of St. Joseph'}
    files = {'image': f}

    # Send the POST request
    response = requests.post(url, data=data, files=files)

# Print the response
print(response.text)



url = base_url + '/image_translator/'  # Change this URL if needed


# Path to the image file
image_path = 'landmark_pics/Cathedral Basilica of St. Joseph/cathedral_basilica_of_st_joseph_getty_plXssBa.jpg'


img = Image.open(image_path)
img.show()


# Open the image file
with open(image_path, 'rb') as f:
    # Create a dictionary with the data to be sent in the request
    data = {'location': 'Cathedral Basilica of St. Joseph', "style" : "fantasy" }
    files = {'image': f}

    # Send the POST request
    response = requests.post(url, data=data, files=files)

# Check if request was successful

if response.status_code == 200:
    # Get the encoded image data from the JSON response
    encoded_image = response.json()["result"]
    
    # Decode the Base64 encoded image data
    decoded_image = base64.b64decode(encoded_image)

    # Save the decoded image to a file
    with open('decoded_image.jpg', 'wb') as img_file:
        img_file.write(decoded_image)
    print("Image received and saved successfully.")
    
    # Open the saved image using PIL and display it
    img = Image.open('decoded_image.jpg')
    img.show()



