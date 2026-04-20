import csv
import json

# read product data
with open("products.json") as f:
    data = json.load(f)

products = {}
for p in data["products"]:
    products[p["product_id"]] = p["price"]

# read orders and calculate revenue
with open("orders.csv") as f:
    reader = csv.DictReader(f)

    for row in reader:
        pid = int(row["product_id"])
        qty = int(row["quantity"])

        revenue = products[pid] * qty

        print("Order", row["order_id"], "Revenue:", revenue)