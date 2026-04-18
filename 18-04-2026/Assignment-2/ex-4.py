import json

f = open("orders.json", "r")
data = json.load(f)

orders = data["orders"]

# print all orders
print(orders)

# total revenue
total = 0
for i in orders:
    total += i["amount"]

print("Revenue:", total)

# spending per customer
spending = {}
for i in orders:
    name = i["customer"]

    if name in spending:
        spending[name] += i["amount"]
    else:
        spending[name] = i["amount"]

print(spending)

# highest spender
top = max(spending, key=spending.get)
print("Top customer:", top)

# order count
count = {}
for i in orders:
    name = i["customer"]

    if name in count:
        count[name] += 1
    else:
        count[name] = 1

print(count)