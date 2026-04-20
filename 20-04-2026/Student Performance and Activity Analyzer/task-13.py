import csv

with open("attendance.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row)