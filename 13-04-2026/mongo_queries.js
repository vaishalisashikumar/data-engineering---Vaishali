1.
db.customers.find()

2.
db.products.find()

3.
db.orders.find()

4.
db.customers.find({city:"Hyderabad"})

5.
db.products.find({category:"Electronics"})

6.
db.products.find({price:{$gt:30000}})

7.
db.orders.find({quantity:{$gt:1}})

8.
db.products.find().sort({price:-1})

9.
db.customers.find().sort({name:1})

10.
db.orders.countDocuments()

11.
db.products.aggregate([{$group:{_id:null,avgPrice:{$avg:"$price"}}}])

12.
db.products.aggregate([{$group:{_id:null,maxPrice:{$max:"$price"}}}])

13.
db.orders.aggregate([{$group:{_id:"$product_id",totalQuantity:{$sum:"$quantity"}}}])

14.
db.orders.aggregate([{$lookup:{from:"customers",localField:"customer_id",foreignField:"customer_id",as:"customer_details"}}])

15.
db.orders.aggregate([{$lookup:{from:"products",localField:"product_id",foreignField:"product_id",as:"product_details"}}])

16.
db.orders.aggregate([{$lookup:{from:"customers",localField:"customer_id",foreignField:"customer_id",as:"customer"}},{$lookup:{from:"products",localField:"product_id",foreignField:"product_id",as:"product"}}])

17.
db.orders.aggregate([{$group:{_id:"$product_id",totalSold:{$sum:"$quantity"}}},{$lookup:{from:"products",localField:"_id",foreignField:"product_id",as:"product"}}])

18.
db.orders.aggregate([{$lookup:{from:"products",localField:"product_id",foreignField:"product_id",as:"product"}},{$unwind:"$product"},{$group:{_id:"$product_id",revenue:{$sum:{$multiply:["$quantity","$product.price"]}}}}])

19.
db.orders.aggregate([{$lookup:{from:"products",localField:"product_id",foreignField:"product_id",as:"product"}},{$unwind:"$product"},{$group:{_id:"$customer_id",totalRevenue:{$sum:{$multiply:["$quantity","$product.price"]}}}}])

20.
db.orders.aggregate([{$group:{_id:"$product_id",totalSold:{$sum:"$quantity"}}},{$sort:{totalSold:-1}},{$limit:1}])
