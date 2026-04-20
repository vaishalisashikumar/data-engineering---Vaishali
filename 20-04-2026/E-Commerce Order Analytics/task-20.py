import csv
import json

# load products
with open("products.json") as f:
    data = json.load(f)

products = {}
for p in data["products"]:
    products[p["product_id"]] = p["price"]

spending = {}

# read orders
with open("orders.csv") as f:
    reader = csv.DictReader(f)

    for row in reader:
        customer = row["customer"]
        pid = int(row["product_id"])
        qty = int(row["quantity"])

        total = products[pid] * qty

        if customer in spending:
            spending[customer] = spending[customer] + total
        else:
            spending[customer] = total

print(spending)