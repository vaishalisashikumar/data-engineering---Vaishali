import json

with open("marks.json") as f:
    data = json.load(f)

marks = []

for s in data["students"]:
    marks.append(s["marks"])

print("Highest:", max(marks))
print("Lowest:", min(marks))
print("Sum:", sum(marks))