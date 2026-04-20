with open("students.txt") as f:
    students = [line.strip() for line in f]

unique = set(students)
print(unique)