import csv
import json
data={}
with open("marks.json") as f:
    marks_data=json.load(f)
for s in marks_data["students"]:
    data[s["name"]]={"marks":s["marks"],"course":s["course"]}
with open("attendance.csv") as f:
    reader=csv.DictReader(f)
    for row in reader:
        name=row["name"]
        present=int(row["days_present"])
        total=int(row["total_days"])
        percent=(present/total)*100
        data[name]["attendance"]=percent
for name in data:
    if data[name]["marks"]>=75 and data[name]["attendance"]>=80:
        print(name)