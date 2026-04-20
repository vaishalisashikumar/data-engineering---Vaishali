import csv
import json

with open("products.json") as f:
    data = json.load(f)

products = {}
for p in data["products"]:
    products[p["product_id"]] = p["price"]

spending = {}

# calculate spending
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

# find top customer
top_customer = ""
max_value = 0

for c in spending:
    if spending[c] > max_value:
        max_value = spending[c]
        top_customer = c

print("Top Customer:", top_customer, "Spent:", max_value)