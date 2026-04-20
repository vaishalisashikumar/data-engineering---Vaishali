import json
with open("marks.json") as f:
    data = json.load(f)
marks_dict = {}
for s in data["students"]:
    name = s["name"]
    marks = s["marks"]
    marks_dict[name] = marks
print(marks_dict)