import csv

with open("attendance.csv") as f:
    reader = csv.DictReader(f)

    for row in reader:
        present = int(row["days_present"])
        total = int(row["total_days"])

        percent = (present / total) * 100

        if percent < 80:
            print(row["name"], "->", percent)