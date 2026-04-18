with open("logins.txt", "r") as f:
    logins = [line.strip() for line in f]

# 1.Print names
print(logins)

# 2.Total records
print("Total:", len(logins))

# 3.Frequency
freq = {}
for user in logins:
    freq[user] = freq.get(user, 0) + 1

print(freq)

# 4.Max login user
print("Top user:", max(freq, key=freq.get))

# 5.Unique users
print("Unique:", set(logins))