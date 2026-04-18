classA = {"Rahul","Sneha","Amit","Neha"}
classB = {"Sneha","Amit","Karan","Riya"}

# 1. Common students
print("Common:", classA.intersection(classB))

# 2. Only in Class A
print("Only in A:", classA.difference(classB))

# 3. All unique students (full list)
print("All students:", classA.union(classB))