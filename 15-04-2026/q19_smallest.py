nums=[1,2,3,4,5,6]
min=nums[0]
for i in range(0,len(nums)):
    if nums[i]<min:
        min=nums[i]
print(min)