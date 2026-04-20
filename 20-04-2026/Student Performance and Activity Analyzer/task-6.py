import json

with open("marks.json") as f:
    data = json.load(f)

print(data)