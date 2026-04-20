import json
def load_marks():
    with open("marks.json") as f:
        data = json.load(f)
    return data["students"]
print(load_marks())