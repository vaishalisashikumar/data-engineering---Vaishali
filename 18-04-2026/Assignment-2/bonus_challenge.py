import csv

f = open("sales.csv", "r")
reader = csv.DictReader(f)

sales = []
for row in reader:
    sales.append(row)

summary = {}

for i in sales:
    p = i["product"]
    q = int(i["quantity"])
    r = q * int(i["price"])

    if p not in summary:
        summary[p] = {"qty": 0, "revenue": 0}

    summary[p]["qty"] += q
    summary[p]["revenue"] += r

print("Product Sales Summary")

for i in summary:
    print(f"{i} → Qty: {summary[i]['qty']} Revenue: {summary[i]['revenue']}")