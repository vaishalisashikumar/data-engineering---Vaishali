import json

with open("products.json") as f:
    data = json.load(f)
cheap = data["products"][0]
for p in data["products"]:
    if p["price"] < cheap["price"]:
        cheap = p

print(cheap)