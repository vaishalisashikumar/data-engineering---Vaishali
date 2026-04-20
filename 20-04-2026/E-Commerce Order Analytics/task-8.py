import json

with open("products.json") as f:
    data = json.load(f)

for p in data["products"]:
    print(p["name"], "→", p["price"])