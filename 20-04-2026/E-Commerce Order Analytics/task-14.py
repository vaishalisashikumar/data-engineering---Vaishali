import csv

qty = {}

with open("orders.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        pid = int(row["product_id"])
        q = int(row["quantity"])

        qty[pid] = qty.get(pid, 0) + q

print(qty)