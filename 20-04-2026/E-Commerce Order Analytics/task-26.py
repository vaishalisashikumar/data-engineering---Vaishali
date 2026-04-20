import csv
import json

def calculate_product_revenue():
    with open("products.json") as f:
        data = json.load(f)

    products = {}
    for p in data["products"]:
        products[p["product_id"]] = {
            "name": p["name"],
            "price": p["price"]
        }

    revenue = {}

    with open("orders.csv") as f:
        reader = csv.DictReader(f)

        for row in reader:
            pid = int(row["product_id"])
            qty = int(row["quantity"])

            name = products[pid]["name"]
            price = products[pid]["price"]

            total = price * qty

            if name in revenue:
                revenue[name] = revenue[name] + total
            else:
                revenue[name] = total

    return revenue

# call
print(calculate_product_revenue())