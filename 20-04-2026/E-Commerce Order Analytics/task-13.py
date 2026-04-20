import csv

with open("orders.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row)