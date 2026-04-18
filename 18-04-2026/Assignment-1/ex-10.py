logins = [
    ("Rahul","10:00"),
    ("Sneha","10:10"),
    ("Rahul","11:00"),
    ("Arjun","11:15"),
    ("Sneha","11:30")
]

count = {}

for user, time in logins:
    if user in count:
        count[user] += 1
    else:
        count[user] = 1

print(count)