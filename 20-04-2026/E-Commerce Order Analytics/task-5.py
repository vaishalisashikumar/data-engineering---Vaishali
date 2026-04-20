from collections import Counter

with open("website_visits.txt") as f:
    visits = [line.strip() for line in f]

count = Counter(visits)
print(dict(count))