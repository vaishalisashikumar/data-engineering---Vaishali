import json

with open("marks.json") as f:
    data = json.load(f)

courses = []

for s in data["students"]:
    courses.append(s["course"])

course_tuple = tuple(courses)

print(course_tuple)