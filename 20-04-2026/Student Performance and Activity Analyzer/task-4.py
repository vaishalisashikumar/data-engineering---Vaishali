count = {}

with open("students.txt") as f:
    for line in f:
        name = line.strip()

        if name in count:
            count[name] = count[name] + 1
        else:
            count[name] = 1

print(count)