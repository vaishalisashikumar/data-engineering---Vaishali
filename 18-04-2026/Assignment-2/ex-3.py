import json
with open("students.json", "r") as f:
    data = json.load(f)
students = data["students"]
for s in students:
    print(s["name"])
for s in students:
    if s["course"] == "Python":
        print("Python student:", s["name"])
topper = max(students, key=lambda x: x["marks"])
print("Topper:", topper["name"])
avg = sum(s["marks"] for s in students) / len(students)
print("Average:", avg)
course_count = {}
for s in students:
    course = s["course"]
    course_count[course] = course_count.get(course, 0) + 1

print(course_count)