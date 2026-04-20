import csv

# load visits
visits = []
with open("website_visits.txt") as f:
    for line in f:
        visits.append(line.strip())

visit_set = set(visits)

# load order customers
order_customers = set()
with open("orders.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        order_customers.add(row["customer"])

# difference
result = visit_set - order_customers

print("Visited but never ordered:", result)