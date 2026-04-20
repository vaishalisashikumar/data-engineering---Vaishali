import csv
import json

# load products
with open("products.json") as f:
    data = json.load(f)

products = {}
for p in data["products"]:
    products[p["product_id"]] = {
        "name": p["name"],
        "price": p["price"]
    }

revenue = {}

# calculate revenue per product
with open("orders.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        pid = int(row["product_id"])
        qty = int(row["quantity"])

        name = products[pid]["name"]
        price = products[pid]["price"]

        total = price * qty

        revenue[name] = revenue.get(name, 0) + total

# find highest manually
top_product = None
max_value = 0

for product in revenue:
    if revenue[product] > max_value:
        max_value = revenue[product]
        top_product = product

print("Top product:", top_product, "→", max_value)