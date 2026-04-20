import csv
attendance_dict = {}
with open("attendance.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        name = row["name"]
        present = int(row["days_present"])
        total = int(row["total_days"])
        percent = (present / total) * 100
        attendance_dict[name] = percent
print(attendance_dict)