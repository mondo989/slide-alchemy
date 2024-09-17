import sys
from backgroundremover import remove_background

# Get the image path from the command-line arguments
input_image_path = sys.argv[1]

# Output path for the processed image
output_image_path = input_image_path.replace(".jpeg", "_no_bg.png").replace(".jpg", "_no_bg.png").replace(".png", "_no_bg.png")

# Remove the background from the image
remove_background(input_image_path, output_image_path)

print(f"Background removed: {output_image_path}")
