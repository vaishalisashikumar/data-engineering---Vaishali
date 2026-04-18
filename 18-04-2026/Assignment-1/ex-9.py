sales = [
    {"product": "Laptop", "qty": 5},
    {"product": "Mouse", "qty": 20},
    {"product": "Laptop", "qty": 3},
    {"product": "Keyboard", "qty": 10}
]

total = {}

for item in sales:
    product = item["product"]
    qty = item["qty"]

    if product in total:
        total[product] += qty
    else:
        total[product] = qty

print("Total sales:", total)

highest = max(total,key=total.get)
print("Highest selling:", highest)