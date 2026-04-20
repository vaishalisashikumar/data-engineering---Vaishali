import json

with open("marks.json") as f:
    data = json.load(f)

total = 0
count = 0

for s in data["students"]:
    total = total + s["marks"]
    count = count + 1

avg = total / count

print("Average marks:", avg)