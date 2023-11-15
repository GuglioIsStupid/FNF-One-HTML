import os, sys

# get file
if len(sys.argv) < 2:
    print("Usage: python xml-to-js-string.py <filename>")
    sys.exit(1)

filename = sys.argv[1]
if not os.path.isfile(filename):
    print("File not found: " + filename)
    sys.exit(1)

# read file
js_string = "xml_data = '"
with open(filename, 'r') as file:
    for line in file:
        js_string += line.strip() + "' +\n'"

js_string = js_string[:-4] + ";"

#save js_string.js
with open(filename + ".js", 'w') as file:
    file.write(js_string)

print("Done!")