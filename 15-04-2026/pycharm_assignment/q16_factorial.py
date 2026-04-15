import math
num=int(input('Enter a number: '))
if num<0:print('No negative number')
else:
    res=1
    for i in range(2,num+1):
        res*=i
    print(res)