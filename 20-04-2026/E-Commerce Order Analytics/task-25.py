import csv

def load_orders():
    orders = []
    with open("orders.csv") as f:
        reader = csv.DictReader(f)
        for row in reader:
            orders.append({
                "order_id": int(row["order_id"]),
                "customer": row["customer"],
                "product_id": int(row["product_id"]),
                "quantity": int(row["quantity"])
            })
    return orders
data = load_orders()
print(data)