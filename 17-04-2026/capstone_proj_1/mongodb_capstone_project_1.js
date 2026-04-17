use("online_store_db")

db.orders.insertMany([
{order_id:1001,customer_id:1,product_id:101,quantity:1,order_date:"2026-03-01",status:"Delivered"},
{order_id:1002,customer_id:2,product_id:102,quantity:2,order_date:"2026-03-02",status:"Delivered"},
{order_id:1003,customer_id:1,product_id:105,quantity:1,order_date:"2026-03-03",status:"Pending"},
{order_id:1004,customer_id:3,product_id:103,quantity:1,order_date:"2026-03-05",status:"Delivered"},
{order_id:1005,customer_id:5,product_id:102,quantity:3,order_date:"2026-03-07",status:"Cancelled"},
{order_id:1006,customer_id:6,product_id:104,quantity:4,order_date:"2026-03-08",status:"Delivered"},
{order_id:1007,customer_id:4,product_id:106,quantity:2,order_date:"2026-03-09",status:"Pending"},
{order_id:1008,customer_id:3,product_id:101,quantity:1,order_date:"2026-03-10",status:"Delivered"}
])

db.customers.insertMany([
{customer_id:1,name:"Aarav",city:"Hyderabad",membership:"Gold",age:24},
{customer_id:2,name:"Priya",city:"Bangalore",membership:"Silver",age:28},
{customer_id:3,name:"Rahul",city:"Mumbai",membership:"Gold",age:32},
{customer_id:4,name:"Sneha",city:"Delhi",membership:"Silver",age:26},
{customer_id:5,name:"Kiran",city:"Hyderabad",membership:"Gold",age:30},
{customer_id:6,name:"Meera",city:"Chennai",membership:"Bronze",age:27}
])

db.products.insertMany([
{product_id:101,name:"Laptop",category:"Electronics",price:75000,stock:10},
{product_id:102,name:"Phone",category:"Electronics",price:50000,stock:15},
{product_id:103,name:"Desk",category:"Furniture",price:15000,stock:8},
{product_id:104,name:"Chair",category:"Furniture",price:7000,stock:20},
{product_id:105,name:"Tablet",category:"Electronics",price:30000,stock:12},
{product_id:106,name:"Printer",category:"Electronics",price:12000,stock:5}
])

//Q1 all customers
db.customers.find()

//Q2 all products
db.products.find()

//Q3 all orders
db.orders.find()

//Q4 hyd customers
db.customers.find({city:"Hyderabad"})

//Q5 electronics only
db.products.find({category:"Electronics"})

//Q6 delivered only
db.orders.find({status:"Delivered"})

//Q7 price > 30k
db.products.find({price:{$gt:30000}})

//Q8 price btw 10k–50k
db.products.find({price:{$gte:10000,$lte:50000}})

//Q9 age > 26
db.customers.find({age:{$gt:26}})

//Q10 Qty > 1
db.orders.find({quantity:{$gt:1}})

//Q11 low stock <=10
db.products.find({stock:{$lte:10}})

//Q12 not cancelled
db.orders.find({status:{$ne:"Cancelled"}})

//Q13 hyd or mumbai
db.customers.find({city:{$in:["Hyderabad","Mumbai"]}})

//Q14 name + city only
db.customers.find({},{name:1,city:1,_id:0})

//Q15 name,cat,price
db.products.find({},{name:1,category:1,price:1,_id:0})

//Q16 order dets
db.orders.find({},{order_id:1,quantity:1,status:1,_id:0})

//Q17 sort price low to high
db.products.find().sort({price:1})

//Q18 sort price high to low
db.products.find().sort({price:-1})

//Q19 top 3 expensive
db.products.find().sort({price:-1}).limit(3)

//Q20 least 2 expensive
db.products.find().sort({price:1}).limit(2)

//Q21 skip first 2
db.products.find().sort({product_id:1}).skip(2)

//Q22 age high to low
db.customers.find().sort({age:-1})

//Q23 update laptop price
db.products.updateOne({name:"Laptop"},{$set:{price:78000}})

//Q24 add discount
db.products.updateMany({category:"Electronics"},{$set:{discount:10}})

//Q25 pending - high priority
db.orders.updateMany({status:"Pending"},{$set:{priority:"High"}})

//Q26 meera - silver
db.customers.updateOne({name:"Meera"},{$set:{membership:"Silver"}})

//Q27 delete printer
db.products.deleteOne({name:"Printer"})

//Q28 remove furniture
db.products.deleteMany({category:"Furniture"})

//Q29 remove cancelled
db.orders.deleteMany({status:"Cancelled"})

//Q30 total customers
db.customers.countDocuments()

//Q31 electronics count
db.products.countDocuments({category:"Electronics"})

//Q32 delivered count
db.orders.countDocuments({status:"Delivered"})

//Q33 hyd count
db.customers.countDocuments({city:"Hyderabad"})

//Q34 total stock per category
db.products.aggregate([
  {$group:{_id:"$category",total_stock:{$sum:"$stock"}}}
])

//Q35 avg price per category
db.products.aggregate([
  {$group:{_id:"$category",avg_price:{$avg:"$price"}}}
])

//Q36 max price
db.products.aggregate([
  {$group:{_id:null,max_price:{$max:"$price"}}}
])

//Q37 min price
db.products.aggregate([
  {$group:{_id:null,min_price:{$min:"$price"}}}
])

//Q38 total inventory value
db.products.aggregate([
  {
    $group: {
      _id: null,
      total_inventory: {
        $sum: { $multiply: ["$price", "$stock"] }
      }
    }
  }
])
//Q39 total Qty per product
db.orders.aggregate([
  {$group:{_id:"$product_id",total_qty:{$sum:"$quantity"}}}
])

//Q40 total Qty per customer
db.orders.aggregate([
  {$group:{_id:"$customer_id",total_qty:{$sum:"$quantity"}}}
])

//Q41 orders + customer details
db.orders.aggregate([
  {$lookup:{from:"customers",localField:"customer_id",foreignField:"customer_id",as:"customer"}},
  {$unwind:"$customer"}
])

//Q42 orders + product details
db.orders.aggregate([
  {$lookup:{from:"products",localField:"product_id",foreignField:"product_id",as:"product"}},
  {$unwind:"$product"}
])

//Q43 customer + product name
db.orders.aggregate([
  {$lookup:{from:"customers",localField:"customer_id",foreignField:"customer_id",as:"customer"}},
  {$unwind:"$customer"},
  {$lookup:{from:"products",localField:"product_id",foreignField:"product_id",as:"product"}},
  {$unwind:"$product"},
  {$project:{_id:0,customer_name:"$customer.name",product_name:"$product.name"}}
])

//Q44 full order details
db.orders.aggregate([
  {$lookup:{from:"customers",localField:"customer_id",foreignField:"customer_id",as:"customer"}},
  {$unwind:"$customer"},
  {$lookup:{from:"products",localField:"product_id",foreignField:"product_id",as:"product"}},
  {$unwind:"$product"},
  {$project:{_id:0,customer_name:"$customer.name",city:"$customer.city",product_name:"$product.name",quantity:1,status:1}}
])
