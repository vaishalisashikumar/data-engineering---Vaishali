import csv
f = open("employees.csv", "r")
reader = csv.DictReader(f)
employees = []
for row in reader:
    employees.append(row)
# print names
for i in employees:
    print(i["name"])
# IT department
for i in employees:
    if i["department"] == "IT":
        print("IT:", i["name"])
# average salary
total = 0
for i in employees:
    total += int(i["salary"])
avg = total / len(employees)
print("Average:", avg)
# highest salary
max_sal = 0
top_name = ""
for i in employees:
    if int(i["salary"]) > max_sal:
        max_sal = int(i["salary"])
        top_name = i["name"]
print("Top earner:", top_name)
# department count
dept = {}
for i in employees:
    d = i["department"]

    if d in dept:
        dept[d] += 1
    else:
        dept[d] = 1
print(dept)