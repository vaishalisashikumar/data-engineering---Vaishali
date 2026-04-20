import csv

with open("attendance.csv") as f:
    reader = csv.DictReader(f)

    for row in reader:
        print(row["name"], "->", row["days_present"], "/", row["total_days"])