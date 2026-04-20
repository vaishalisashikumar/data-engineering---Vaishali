with open("website_visits.txt") as f:
    visits = [line.strip() for line in f]

for v in visits:
    print(v)