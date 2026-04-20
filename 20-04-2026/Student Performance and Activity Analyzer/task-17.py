import csv

with open("attendance.csv") as f:
    reader = list(csv.DictReader(f))

best = reader[0]

for row in reader:
    present = int(row["days_present"])
    total = int(row["total_days"])

    percent = (present / total) * 100

    best_present = int(best["days_present"])
    best_total = int(best["total_days"])

    best_percent = (best_present / best_total) * 100

    if percent > best_percent:
        best = row

# print result
present = int(best["days_present"])
total = int(best["total_days"])
percent = (present / total) * 100

print("Best attendance:", best["name"], "->", percent)