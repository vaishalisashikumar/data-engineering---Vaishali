#avoid duplicates
numbers={10,20,30,40,50}
print(numbers)
numbers = [10,20,20,30,40,50]
print(numbers)
#list to set
number = set(numbers)
print(number)
#Add
numbers={10,20,30}
numbers.add(40)
print(numbers)

#update
numbers={10,20,30,40,50}
numbers.update([60,70,80])
print(numbers)