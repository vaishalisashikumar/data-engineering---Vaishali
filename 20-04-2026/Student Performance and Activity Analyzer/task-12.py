import json

with open("marks.json") as f:
    data = json.load(f)

course_count = {}

for s in data["students"]:
    course = s["course"]

    if course in course_count:
        course_count[course] = course_count[course] + 1
    else:
        course_count[course] = 1

print(course_count)