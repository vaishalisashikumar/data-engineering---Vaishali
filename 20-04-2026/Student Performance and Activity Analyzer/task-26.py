def read_students():
    students = []
    with open("students.txt") as f:
        for line in f:
            students.append(line.strip())
    return students
print(read_students())