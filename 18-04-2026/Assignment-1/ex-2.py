#frequency counter
numbers = [10,20,10,30,20,10,40]
freq={}
for i in numbers:
    if i in freq:freq[i]+=1
    else:freq[i]=1
print(freq)