def load_visits():
    with open("website_visits.txt") as f:
        visits = []
        for line in f:
            visits.append(line.strip())
    return visits

data = load_visits()
print(data)