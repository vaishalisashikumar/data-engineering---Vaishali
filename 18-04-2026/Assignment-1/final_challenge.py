orders = [
    {"order_id": 1, "customer": "Rahul", "amount": 2500},
    {"order_id": 2, "customer": "Sneha", "amount": 1800},
    {"order_id": 3, "customer": "Rahul", "amount": 3200},
    {"order_id": 4, "customer": "Amit", "amount": 1500}
]

spending = {}
order_count = {}

for order in orders:
    customer = order["customer"]
    amount = order["amount"]

    # total spending
    if customer in spending:
        spending[customer] += amount
    else:
        spending[customer] = amount

    # order count
    if customer in order_count:
        order_count[customer] += 1
    else:
        order_count[customer] = 1

print("Total spending:", spending)

highest = max(spending, key=spending.get)
print("Highest spender:", highest)

print("Order count:", order_count)
    