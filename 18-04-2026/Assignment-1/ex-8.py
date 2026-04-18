sentence = "python is easy and python is powerful"
words = sentence.split()
dict={}
for word in words:
    if word in dict:
        dict[word] += 1
    else:
        dict[word] = 1
print(dict)
