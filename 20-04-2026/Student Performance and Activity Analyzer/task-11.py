import json

with open("marks.json") as f:
    data = json.load(f)

for s in data["students"]:
    if s["course"] == "Python":
        print(s["name"], "->", s["marks"])