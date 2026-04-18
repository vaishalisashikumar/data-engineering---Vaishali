with open("nums.txt", "r") as f:
    numbs = [int(line.strip()) for line in f]

print("Sum:", sum(numbs))
print("Max:", max(numbs))
print("Min:", min(numbs))

count = sum(1 for n in numbs if n > 50)
print("Greater than 50:", count)