import csv
from collections import Counter

customers = []

with open("orders.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        customers.append(row["customer"])

count = Counter(customers)
print(dict(count))