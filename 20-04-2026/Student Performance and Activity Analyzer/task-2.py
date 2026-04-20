with open("students.txt") as f:
    students = [line.strip() for line in f]

print("Total entries:", len(students))