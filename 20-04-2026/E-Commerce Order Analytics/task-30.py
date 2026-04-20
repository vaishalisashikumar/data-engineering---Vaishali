import csv
from collections import Counter

# load visits
visits = []
with open("website_visits.txt") as f:
    for line in f:
        visits.append(line.strip())

visit_count = Counter(visits)

# load order customers
order_customers = set()
with open("orders.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        order_customers.add(row["customer"])

# filter
low_visit = []

for customer in order_customers:
    if visit_count[customer] <= 1:
        low_visit.append(customer)

print("Ordered but visited <=1:", low_visit)