import csv
def load_attendance():
    attendance = []
    with open("attendance.csv") as f:
        reader = csv.DictReader(f)
        for row in reader:
            attendance.append(row)
    return attendance
print(load_attendance())