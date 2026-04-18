inventory = {
"laptop":10,
"mouse":25,
"keyboard":15
}
inventory['monitor']=8
inventory['laptop']-=2
for name,stocks in inventory.items():
    if stocks<10:
        print(name,stocks)
print(inventory)