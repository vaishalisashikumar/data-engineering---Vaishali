students = {
    "Rahul":85,
    "Sneha":92,
    "Arjun":78,
    "Priya":88
}


topper = max(students, key=students.get)
print("Topper:", topper)


avg = sum(students.values()) / len(students)
print("Average:", avg)

# Above 85
for name, marks in students.items():
    if marks > 85:
        print("Above 85:", name)