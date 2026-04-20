import csv
import json


with open("products.json") as f:
    data = json.load(f)

products = {}
for p in data["products"]:
    products[p["product_id"]] = p["price"]

total_revenue = 0

with open("orders.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        pid = int(row["product_id"])
        qty = int(row["quantity"])

        total_revenue += products[pid] * qty

print("Total Revenue:", total_revenue)