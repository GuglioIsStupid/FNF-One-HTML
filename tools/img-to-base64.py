import os, sys, base64

# get file
if len(sys.argv) < 2:
    print("Usage: python img-to-base64.py <filename>")
    sys.exit(1)

filename = sys.argv[1]
if not os.path.isfile(filename):
    print("File not found: " + filename)
    sys.exit(1)

# read file
js_string = "img_data = '"
with open(filename, 'rb') as file:
    # convert image to b64
    img_data = base64.b64encode(file.read())
    
    # convert b64 to string
    img_data = img_data.decode("utf-8")

    # add to js_string
    js_string += img_data + "';"

#save js_string.js
with open(filename + ".js", 'w') as file:
    file.write(js_string)

print("Done!")