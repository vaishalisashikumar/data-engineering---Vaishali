import csv
import json
with open("marks.json") as f:
    data = json.load(f)
marks_dict = {}
for s in data["students"]:
    marks_dict[s["name"]] = s["marks"]
attendance_dict = {}
with open("attendance.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        name = row["name"]
        present = int(row["days_present"])
        total = int(row["total_days"])
        percent = (present / total) * 100
        attendance_dict[name] = percent
for name in marks_dict:
    if marks_dict[name] > 80 and attendance_dict[name] > 85:
        print(name)