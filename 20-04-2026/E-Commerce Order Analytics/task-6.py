from collections import Counter

with open("website_visits.txt") as f:
    visits = [line.strip() for line in f]

count = Counter(visits)
print("Most frequent visitor:", count.most_common(1)[0][0])