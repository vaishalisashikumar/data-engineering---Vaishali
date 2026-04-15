//TEST _ 15-04-2026
use library_db
switched to db library_db
db.members.insertMany([
  { member_id: 1, name: "Aarav", city: "Hyderabad", membership_type: "Gold" },
  { member_id: 2, name: "Priya", city: "Bangalore", membership_type: "Silver" },
  { member_id: 3, name: "Rahul", city: "Mumbai", membership_type: "Gold" },
  { member_id: 4, name: "Sneha", city: "Delhi", membership_type: "Silver" },
  { member_id: 5, name: "Kiran", city: "Hyderabad", membership_type: "Gold" }
])

db.books.insertMany([
  { book_id: 101, title: "MongoDB Basics", category: "Database", author: "John Smith", price: 500 },
  { book_id: 102, title: "Python Fundamentals", category: "Programming", author: "Alice Brown", price: 650 },
  { book_id: 103, title: "Data Engineering Intro", category: "Data", author: "Mark Lee", price: 800 },
  { book_id: 104, title: "SQL for Beginners", category: "Database", author: "David Miller", price: 450 },
  { book_id: 105, title: "Machine Learning Start", category: "AI", author: "Sara Khan", price: 900 }
])

db.borrowings.insertMany([
  { borrow_id: 1001, member_id: 1, book_id: 101, days_borrowed: 5, borrow_date: "2026-03-01" },
  { borrow_id: 1002, member_id: 2, book_id: 102, days_borrowed: 3, borrow_date: "2026-03-02" },
  { borrow_id: 1003, member_id: 1, book_id: 103, days_borrowed: 7, borrow_date: "2026-03-03" },
  { borrow_id: 1004, member_id: 3, book_id: 104, days_borrowed: 4, borrow_date: "2026-03-05" },
  { borrow_id: 1005, member_id: 5, book_id: 105, days_borrowed: 10, borrow_date: "2026-03-07" },
  { borrow_id: 1006, member_id: 5, book_id: 101, days_borrowed: 2, borrow_date: "2026-03-08" }
])

//Q1. Display all members
db.members.find().pretty()

//Q2. Display all books
db.books.find().pretty()

//Q3. Display all borrowings
db.borrowings.find().pretty()

//Q4. Show members from Hyderabad
db.members.find({city:'Hyderabad'})

//Q5.Show books in the Database category
db.books.find({category:"Database"})

//Q6. Show books whose price is greater than 600
db.books.find({price:{$gt:600}})

//Q7.Show borrowings where days_borrowed is greater than 5
db.borrowings.find({days_borrowed:{$gt:5}})
 
//Q8. Books price in descending 
db.books.find().sort({"price":-1})

//Q9. Members name in ascending 
db.members.find().sort({"name":1})

//Q10. Count of members
db.members.countDocuments()

//Q11. COunt of books
db.books.countDocuments()

//Q12. Count of books in database category
db.books.countDocuments({"category":"Database"})

//Q13. Avg price of books
db.books.aggregate([
  {
    $group:{
      _id: null,
      average_price:{$avg:"$price"}
    }
  }
])

//Q14. Max book price
db.books.aggregate([
  {
    $group:{
      _id: null,
      max_price:{$max:"$price"}
    }
  }
])

//Q15. Min book price
db.books.aggregate([
  {
    $group:{
      _id: null,
      min_price:{$min:"$price"}
    }
  }
])

//Q16. Tot. days borrowed
db.borrowings.aggregate([
  {
    $group: {
      _id: "$member_id",
      total_days: { $sum: "$days_borrowed" }
    }
  }
])

//Q17. Borrowings with member dets
db.borrowings.aggregate([
  {
    $lookup: {
      from: "members",
      localField: "member_id",
      foreignField: "member_id",
      as: "member_details"
    }
  }
])

//Q18. borrowings along with book dets
db.borrowings.aggregate([
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book_details"
    }
  }
])

//Q19. Member name,book title for each borrowing 
db.borrowings.aggregate([
  {
    $lookup: {
      from: "members",
      localField: "member_id",
      foreignField: "member_id",
      as: "member"
    }
  },
  {
    $unwind: "$member"
  },
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  {
    $unwind: "$book"
  },
  {
    $project: {
      _id: 0,
      member_name: "$member.name",
      book_title: "$book.title"
    }
  }
])

//Q20. Book title, total times its borrowed
db.borrowings.aggregate([
  {
    $group: {
      _id: "$book_id",
      total_borrowed: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "books",
      localField: "_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  {
    $unwind: "$book"
  },
  {
    $project: {
      _id: 0,
      book_title: "$book.title",
      total_borrowed: 1
    }
  }
])

//Q21. total number of books borrowed by each member
db.borrowings.aggregate([
  {
    $group: {
      _id: "$member_id",
      total_books: { $sum: 1 }
    }
  }
])


//Q22.most borrowed book
db.borrowings.aggregate([
  {
    $group: {
      _id: "$book_id",
      total_borrowed: { $sum: 1 }
    }
  },
  {
    $sort: { total_borrowed: -1 }
  },
  {
    $limit: 1
  }
])

//Q23.total borrowing count by category
db.borrowings.aggregate([
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  {
    $unwind: "$book"
  },
  {
    $group: {
      _id: "$book.category",
      total_borrowings: { $sum: 1 }
    }
  }
  ])

//Q24. members with more than one book - borrowed
db.borrowings.aggregate([
  {
    $group: {
      _id: "$member_id",
      total_books: { $sum: 1 }
    }
  },
  {
    $match: {
      total_books: { $gt: 1 }
    }
  }
])

//Q25. Name,city,total books sorted by highest books borrowed 
db.borrowings.aggregate([
  {
    $group: {
      _id: "$member_id",
      total_books: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "members",
      localField: "_id",
      foreignField: "member_id",
      as: "member"
    }
  },
  {
    $unwind: "$member"
  },
  {
    $project: {
      _id: 0,
      member_name: "$member.name",
      city: "$member.city",
      total_books: 1
    }
  },
  {
    $sort: {
      total_books: -1
    }
  }
])

