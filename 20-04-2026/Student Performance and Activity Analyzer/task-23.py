import json
with open("marks.json") as f:
    data = json.load(f)
for s in data["students"]:
    if s["marks"] >= 50:
        print(s["name"], "-> Pass")
    else:
        print(s["name"], "-> Fail")