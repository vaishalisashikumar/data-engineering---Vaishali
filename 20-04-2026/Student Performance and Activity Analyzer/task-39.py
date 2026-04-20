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

# topper
top_name=""
max_marks=0
for name in data:
    if data[name]["marks"]>max_marks:
        max_marks=data[name]["marks"]
        top_name=name

# best attendance
best_name=""
max_att=0
for name in data:
    if data[name]["attendance"]>max_att:
        max_att=data[name]["attendance"]
        best_name=name

# average
total=0
count=0
for name in data:
    total+=data[name]["marks"]
    count+=1
avg=total/count

# eligible & improvement
eligible=[]
improve=[]

for name in data:
    if data[name]["marks"]>=75 and data[name]["attendance"]>80:
        eligible.append(name)
    if data[name]["marks"]<75 or data[name]["attendance"]<80:
        improve.append(name)

print("Topper:",top_name)
print("Best Attendance:",best_name)
print("Average Marks:",avg)
print("Eligible Students:",", ".join(eligible))
print("Students Needing Improvement:",", ".join(improve))