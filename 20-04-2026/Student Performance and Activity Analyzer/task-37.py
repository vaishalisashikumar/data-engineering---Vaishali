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
with open("report.txt","w") as f:
    f.write("Student Report\n")
    for name in data:
        marks=data[name]["marks"]
        att=data[name]["attendance"]
        if marks>=90:
            grade="A"
        elif marks>=75:
            grade="B"
        elif marks>=50:
            grade="C"
        else:
            grade="Fail"
        f.write(name+" - Marks: "+str(marks)+" - Attendance: "+str(att)+"% - Grade: "+grade+"\n")
print("Report created")