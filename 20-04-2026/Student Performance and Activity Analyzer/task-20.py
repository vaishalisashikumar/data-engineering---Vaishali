import json
with open("marks.json") as f:
    data = json.load(f)
courses = []
for s in data["students"]:
    courses.append(s["course"])
unique_courses = set(courses)
print(unique_courses)