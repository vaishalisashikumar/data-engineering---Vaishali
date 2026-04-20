import csv
import json

def load_data():
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
    return data

def get_topper(data):
    top=""
    maxm=0
    for name in data:
        if data[name]["marks"]>maxm:
            maxm=data[name]["marks"]
            top=name
    return top

def get_best_attendance(data):
    best=""
    maxa=0
    for name in data:
        if data[name]["attendance"]>maxa:
            maxa=data[name]["attendance"]
            best=name
    return best

def get_average(data):
    total=0
    count=0
    for name in data:
        total+=data[name]["marks"]
        count+=1
    return total/count

def get_eligible(data):
    result=[]
    for name in data:
        if data[name]["marks"]>=75 and data[name]["attendance"]>80:
            result.append(name)
    return result

def get_improve(data):
    result=[]
    for name in data:
        if data[name]["marks"]<75 or data[name]["attendance"]<80:
            result.append(name)
    return result

data=load_data()

print("Topper:",get_topper(data))
print("Best Attendance:",get_best_attendance(data))
print("Average Marks:",get_average(data))
print("Eligible Students:",", ".join(get_eligible(data)))
print("Students Needing Improvement:",", ".join(get_improve(data)))