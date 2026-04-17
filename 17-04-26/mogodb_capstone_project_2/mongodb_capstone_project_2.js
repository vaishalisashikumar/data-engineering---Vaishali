use("hospital_db")

//inserting patient records
db.patients.insertMany([
{patient_id: 1,name: "Aarav",city: "Hyderabad",age: 29,gender: "Male"},
{patient_id: 2,name: "Priya",city: "Bangalore",age: 34,gender: "Female"},
{patient_id: 3,name: "Rahul",city: "Mumbai",age: 41,gender: "Male" },
{patient_id: 4,name: "Sneha",city: "Delhi",age: 26,gender: "Female"},
{patient_id: 5,name: "Kiran",city: "Hyderabad",age: 37,gender: "Male"},
{patient_id: 6,name: "Meera",city: "Chennai",age: 31,gender: "Female"}
])

//doctors data
db.doctors.insertMany([
{doctor_id: 101,name: "Dr.Sharma",specialization: "Cardiology",consultation_fee: 1250,city: "Hyderabad" },
{doctor_id: 102,name: "Dr.Iyer",specialization: "Dermatology",consultation_fee: 950,city: "Chennai" },
{doctor_id: 103,name: "Dr.Khan",specialization: "Orthopedics",consultation_fee: 1450,city: "Mumbai" },
{doctor_id: 104,name: "Dr.Reddy",specialization: "Pediatrics",consultation_fee: 850,city: "Delhi" },
{doctor_id: 105,name: "Dr.Mehta",specialization: "Neurology",consultation_fee: 1700,city: "Hyderabad" }
])

//appointments - linking patients & doctors
db.appointments.insertMany([
{appointment_id: 1001,patient_id: 1,doctor_id: 101,visit_date: "2026-03-01",status: "Completed",bill_amount: 1500 },
{appointment_id: 1002,patient_id: 2,doctor_id: 102,visit_date: "2026-03-02",status: "Pending",bill_amount: 950 },
{appointment_id: 1003,patient_id: 1,doctor_id: 105,visit_date: "2026-03-03",status: "Completed",bill_amount: 2000 },
{appointment_id: 1004,patient_id: 3,doctor_id: 103,visit_date: "2026-03-04",status: "Cancelled",bill_amount: 0 },
{appointment_id: 1005,patient_id: 5,doctor_id: 101,visit_date: "2026-03-05",status: "Completed",bill_amount: 1350 },
{appointment_id: 1006,patient_id: 6,doctor_id: 104,visit_date: "2026-03-06",status: "Pending",bill_amount: 850 },
{appointment_id: 1007,patient_id: 4,doctor_id: 104,visit_date: "2026-03-07",status: "Completed",bill_amount: 1100 },
{appointment_id: 1008,patient_id: 3,doctor_id: 105,visit_date: "2026-03-08",status: "Completed",bill_amount: 2100 }
])

//1.get all patients
db.patients.find()

//2.all doctors
db.doctors.find()

//3.all appointments
db.appointments.find()

//4.patients from hyd only
db.patients.find({city: "Hyderabad" })

//5.filter by cardiology
db.doctors.find({specialization: "Cardiology" })

//6.completed ones
db.appointments.find({status: "Completed" })

//7.age above 30
db.patients.find({age: {$gt: 30 } })

//8.fee >1000
db.doctors.find({consultation_fee: {$gt: 1000 } })

//9.fee between 900 & 1600
db.doctors.find({consultation_fee: {$gte: 900,$lte: 1600 } })

//10.bills over 1000
db.appointments.find({bill_amount: {$gt: 1000 } })

//11.skip cancelled appointments
db.appointments.find({status: {$ne: "Cancelled" } })

//12.hyd or mumbai patients
db.patients.find({city: {$in: ["Hyderabad","Mumbai"] } })

//13.docs in hyd or delhi
db.doctors.find({city: {$in: ["Hyderabad","Delhi"] } })

//14.name & city of patients
db.patients.find({},{name: 1,city: 1,_id: 0 })

//15.doc name,spec & fee
db.doctors.find({},{name: 1,specialization: 1,consultation_fee: 1,_id: 0 })

//16.appt id,status,bill
db.appointments.find({},{appointment_id: 1,status: 1,bill_amount: 1,_id: 0 })

//17.fees in ascending 
db.doctors.find().sort({consultation_fee: 1 })

//18.most expensive first
db.doctors.find().sort({consultation_fee: -1 })

//19.top 3 costly docs
db.doctors.find().sort({consultation_fee: -1 }).limit(3)

//20.bottom 2 fee wise
db.doctors.find().sort({consultation_fee: 1 }).limit(2)

//21.skip first 2 patients
db.patients.find().sort({patient_id: 1 }).skip(2)

//22.patients oldest first
db.patients.find().sort({age: -1 })

//23.updating sharma's fee
db.doctors.updateOne(
  {name: "Dr.Sharma" },
  {$set: {consultation_fee: 1300 } }
)

//24.mark pending as high priority
db.appointments.updateMany(
  {status: "Pending" },
  {$set: {priority: "High" } }
)

//25.set available flag for hyd doctors
db.doctors.updateMany(
  {city: "Hyderabad" },
  {$set: {available: true } }
)

//26.meera moved to bangalore
db.patients.updateOne(
  {name: "Meera" },
  {$set: {city: "Bangalore" } }
)

//27.remove dr iyer
db.doctors.deleteOne({name: "Dr.Iyer" })

//28.clean up cancelled appts
db.appointments.deleteMany({status: "Cancelled" })

//29.remove delhi patients
db.patients.deleteMany({city: "Delhi" })

//30.how many patients total
db.patients.countDocuments()

//31.doc count in hyderabad
db.doctors.countDocuments({city: "Hyderabad" })

//32.completed appt count
db.appointments.countDocuments({status: "Completed" })

//33.hyd patient count
db.patients.countDocuments({city: "Hyderabad" })

//34.avg fee per specialization
db.doctors.aggregate([
  {$group: {_id: "$specialization",avg_fee: {$avg: "$consultation_fee" } } }
])

//35.highest fee among all docs
db.doctors.aggregate([
  {$group: {_id: null,max_fee: {$max: "$consultation_fee" } } }
])

//36.lowest fee
db.doctors.aggregate([
  {$group: {_id: null,min_fee: {$min: "$consultation_fee" } } }
])

//37.total billing grouped by status
db.appointments.aggregate([
  {$group: {_id: "$status",total_bill: {$sum: "$bill_amount" } } }
])

//38.how many appts each doctor has
db.appointments.aggregate([
  {$group: {_id: "$doctor_id",total: {$sum: 1 } } }
])

//39.appts per patient
db.appointments.aggregate([
  {$group: {_id: "$patient_id",total: {$sum: 1 } } }
])

//40.avg age city wise
db.patients.aggregate([
  {$group: {_id: "$city",avg_age: {$avg: "$age" } } }
])

//41.total amount billed per doctor
db.appointments.aggregate([
  {$group: {_id: "$doctor_id",total_bill: {$sum: "$bill_amount" } } }
])

//42.bill total by patient city - needs join with patients
db.appointments.aggregate([
  {
    $lookup: {
      from: "patients",
      localField: "patient_id",
      foreignField: "patient_id",
      as: "patient"
    }
  },
  {$unwind: "$patient" },
  {
    $group: {
      _id: "$patient.city",
      total_bill: {$sum: "$bill_amount" }
    }
  }
])

//43.join appointments with patient info
db.appointments.aggregate([
  {
    $lookup: {
      from: "patients",
      localField: "patient_id",
      foreignField: "patient_id",
      as: "patient_details"
    }
  }
])

//44.join with doctor info
db.appointments.aggregate([
  {
    $lookup: {
      from: "doctors",
      localField: "doctor_id",
      foreignField: "doctor_id",
      as: "doctor_details"
    }
  }
])

//45.get patient name & doctor name together
db.appointments.aggregate([
  {$lookup: {from: "patients",localField: "patient_id",foreignField: "patient_id",as: "patient" } },
  {$unwind: "$patient" },
  {$lookup: {from: "doctors",localField: "doctor_id",foreignField: "doctor_id",as: "doctor" } },
  {$unwind: "$doctor" },
  {$project: {_id: 0,patient_name: "$patient.name",doctor_name: "$doctor.name" } }
])

//46.full view - patient,doc,status,bill etc
db.appointments.aggregate([
  {$lookup: {from: "patients",localField: "patient_id",foreignField: "patient_id",as: "patient" } },
  {$unwind: "$patient" },
  {$lookup: {from: "doctors",localField: "doctor_id",foreignField: "doctor_id",as: "doctor" } },
  {$unwind: "$doctor" },
  {
    $project: {
      _id: 0,
      patient_name: "$patient.name",
      city: "$patient.city",
      doctor_name: "$doctor.name",
      specialization: "$doctor.specialization",
      status: 1,
      bill_amount: 1
    }
  }
])

//47.patients with their appointment list
db.patients.aggregate([
  {
    $lookup: {
      from: "appointments",
      localField: "patient_id",
      foreignField: "patient_id",
      as: "appointments"
    }
  }
])

//48.same but for doctors
db.doctors.aggregate([
  {
    $lookup: {
      from: "appointments",
      localField: "doctor_id",
      foreignField: "doctor_id",
      as: "appointments"
    }
  }
])

//49.revenue each doctor made
db.appointments.aggregate([
  {$group: {_id: "$doctor_id",total_revenue: {$sum: "$bill_amount" } } }
])

//50.revenue by specialization
db.appointments.aggregate([
  {$lookup: {from: "doctors",localField: "doctor_id",foreignField: "doctor_id",as: "doctor" } },
  {$unwind: "$doctor" },
  {$group: {_id: "$doctor.specialization",total_revenue: {$sum: "$bill_amount" } } }
])

//51.appointment with highest bill
db.appointments.aggregate([
  {$sort: {bill_amount: -1 } },
  {$limit: 1 }
])

//52.which doctor has most appointments
db.appointments.aggregate([
  {$group: {_id: "$doctor_id",count: {$sum: 1 } } },
  {$sort: {count: -1 } },
  {$limit: 1 }
])

//53.total revenue from completed appts only
db.appointments.aggregate([
  {$match: {status: "Completed" } },
  {$group: {_id: null,total_revenue: {$sum: "$bill_amount" } } }
])

//54.which city had the most appointments
db.appointments.aggregate([
  {$lookup: {from: "patients",localField: "patient_id",foreignField: "patient_id",as: "patient" } },
  {$unwind: "$patient" },
  {$group: {_id: "$patient.city",count: {$sum: 1 } } },
  {$sort: {count: -1 } },
  {$limit: 1 }
])

//55.city with highest total billing
db.appointments.aggregate([
  {$lookup: {from: "patients",localField: "patient_id",foreignField: "patient_id",as: "patient" } },
  {$unwind: "$patient" },
  {$group: {_id: "$patient.city",total: {$sum: "$bill_amount" } } },
  {$sort: {total: -1 } },
  {$limit: 1 }
])

//56.which specialization charges most on avg
db.appointments.aggregate([
  {$lookup: {from: "doctors",localField: "doctor_id",foreignField: "doctor_id",as: "doctor" } },
  {$unwind: "$doctor" },
  {$group: {_id: "$doctor.specialization",avg_bill: {$avg: "$bill_amount" } } },
  {$sort: {avg_bill: -1 } },
  {$limit: 1 }
])