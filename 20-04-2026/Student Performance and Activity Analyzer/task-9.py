import json

with open("marks.json") as f:
    data = json.load(f)

low = data["students"][0]

for s in data["students"]:
    if s["marks"] < low["marks"]:
        low = s

print("Lowest:", low["name"], "-", low["marks"])