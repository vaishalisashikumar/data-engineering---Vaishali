import json

with open("products.json") as f:
    data = json.load(f)

expensive = data["products"][0]

for p in data["products"]:
    if p["price"] > expensive["price"]:
        expensive = p

print(expensive)