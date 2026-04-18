import csv
f = open("sales.csv", "r")
reader = csv.DictReader(f)
sales = []
for row in reader:
    sales.append(row)
# total revenue
total = 0
for i in sales:
    total += int(i["quantity"]) * int(i["price"])
print("Total revenue:", total)
# quantity per product
qty = {}
for i in sales:
    p = i["product"]

    if p in qty:
        qty[p] += int(i["quantity"])
    else:
        qty[p] = int(i["quantity"])
print(qty)
# highest selling product
max_q = 0
top = ""
for i in qty:
    if qty[i] > max_q:
        max_q = qty[i]
        top = i

print("Top product:", top)
# revenue per product
revenue = {}
for i in sales:
    p = i["product"]
    val = int(i["quantity"]) * int(i["price"])

    if p in revenue:
        revenue[p] += val
    else:
        revenue[p] = val
print(revenue)
# revenue > 50000
for i in revenue:
    if revenue[i] > 50000:
        print("High sales:", i)