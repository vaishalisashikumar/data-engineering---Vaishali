import json

def load_products():
    with open("products.json") as f:
        data = json.load(f)

    products = {}

    for p in data["products"]:
        products[p["product_id"]] = {
            "name": p["name"],
            "price": p["price"]
        }

    return products

data = load_products()
print(data)