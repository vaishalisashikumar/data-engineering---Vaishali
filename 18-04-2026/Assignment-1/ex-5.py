#Email Domain Extractor
emails = [
"user1@gmail.com",
"user2@yahoo.com",
"user3@gmail.com",
"user4@outlook.com"
]
emails = [
    "user1@gmail.com",
    "user2@yahoo.com",
    "user3@gmail.com",
    "user4@outlook.com"
]

domains = {}

for email in emails:
    domain = email.split("@")[1]
    if domain in domains:
        domains[domain] += 1
    else:
        domains[domain] = 1
print(domains)