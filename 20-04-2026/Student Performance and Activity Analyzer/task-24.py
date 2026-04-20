import json
with open("marks.json") as f:
    data = json.load(f)
for s in data["students"]:
    marks = s["marks"]
    if marks >= 90:
        grade = "A"
    elif marks >= 75:
        grade = "B"
    elif marks >= 50:
        grade = "C"
    else:
        grade = "Fail"
    print(s["name"], "->", grade)