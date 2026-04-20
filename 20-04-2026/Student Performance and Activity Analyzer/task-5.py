with open("students.txt") as f:
    students = [line.strip() for line in f]

unique = set(students)

with open("unique_students.txt", "w") as f:
    for name in unique:
        f.write(name + "\n")

print("Unique students written to file")