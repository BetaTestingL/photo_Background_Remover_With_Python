# import the required modules
from rembg import remove
from PIL import Image

input_path = 'images.jpeg'

output_path = 'images_transparent.png'

# processing the image
input = Image.open(input_path)

# removing the background
output = remove(input)

# save the image
output.save(output_path)

