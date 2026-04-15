[
{ "_id": 1, "name": "Laptop", "category": "Electronics", "price": 75000, "stock": 10, "city": "Hyderabad" },
{ "_id": 2, "name": "Phone", "category": "Electronics", "price": 50000, "stock": 15, "city": "Bangalore" },
{ "_id": 3, "name": "Chair", "category": "Furniture", "price": 7000, "stock": 20, "city": "Mumbai" },
{ "_id": 4, "name": "Desk", "category": "Furniture", "price": 15000, "stock": 8, "city": "Delhi" },
{ "_id": 5, "name": "Tablet", "category": "Electronics", "price": 30000, "stock": 12, "city": "Chennai" },
{ "_id": 6, "name": "Printer", "category": "Electronics", "price": 12000, "stock": 5, "city": "Hyderabad" }
]

1. db.products.find()
2. db.products.find({ catgory: "Electronics" })
3. db.products.find({ city: "hyderabad" })
4. db.products.find({ price: { $gt: 30000 } })
5. db.products.find({ price: { $lt: 20000 } })
6. db.products.find({ price: { $gte: 10000, $lte: 50000 } })
7. db.products.find({ catgory: "Furniture" })
8. db.products.find({ catgory: "Electronics", city: "hyderabad" })
9. db.products.find({ city: { $in: ["hyderabad", "Bangalore"] } })
10. db.products.find({ catgory: { $ne: "Furniture" } })
11. db.products.find({}, { name: 1, price: 1, _id: 0 })
12. db.products.find({}, { name: 1, catgory: 1, city: 1, _id: 0 })
13. db.products.find().sort({ price: 1 })
14. db.products.find().sort({ price: -1 })
15. db.products.find().sort({ price: -1 }).limit(3)
16. db.products.find().sort({ price: 1 }).limit(2)
17. db.products.find().skip(2)
18. db.products.find({ stock: { $gt: 10 } })
19. db.products.find({ stock: { $lte: 10 } })
20. db.products.find({ catgory: "Electronics", price: { $gt: 40000 } })
21. db.products.updateOne({ name: "Laptop" }, { $set: { price: 80000 } })
22. db.products.updateMany({ catgory: "Electronics" }, { $set: { discount: 10 } })
23. db.products.deleteOne({ name: "Printer" })
24. db.products.deleteMany({ catgory: "Furniture" })
25. db.products.countDocuments()
26. db.products.countDocuments({ catgory: "Electronics" })
27. db.products.aggregate([{ $group: { _id: "$catgory", totalStock: { $sum: "$stock" } } }])
28. db.products.aggregate([{ $group: { _id: "$catgory", avgPrice: { $avg: "$price" } } }])
29. db.products.aggregate([{ $group: { _id: null, maxPrice: { $max: "$price" } } }])
30. db.products.aggregate([{ $group: { _id: null, totalValue: { $sum: { $multiply: ["$price", "$stock"] } } } }])
