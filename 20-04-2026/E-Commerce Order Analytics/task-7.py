import json

with open("products.json") as f:
    data = json.load(f)

print(data)