import os
from rembg import remove
from PIL import Image

input_dir = "input_images"
output_dir = "output_images"

os.makedirs(output_dir, exist_ok=True)

for file in os.listdir(input_dir):
    if file.lower().endswith((".png", ".jpg", ".jpeg")):
        img = Image.open(os.path.join(input_dir, file))
        out = remove(img)
        out.save(os.path.join(output_dir, file.split('.')[0] + ".png"))
