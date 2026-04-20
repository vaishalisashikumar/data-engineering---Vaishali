import json

with open("marks.json") as f:
    data = json.load(f)

top = data["students"][0]

for s in data["students"]:
    if s["marks"] > top["marks"]:
        top = s

print("Topper:", top["name"], "-", top["marks"])