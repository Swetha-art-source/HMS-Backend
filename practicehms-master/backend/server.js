//create varables and import pacages
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const cron = require('node-cron');

//import .env
require("dotenv").config();

//initialize port number
const PORT = process.env.PORT || 8050;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//use dependancies
app.use(cors());
//get json using bodyparser
app.use(bodyParser.json());

//connect mongo db options
const URI = "mongodb+srv://swetha:Swetha%4015@cluster0.ubaagpf.mongodb.net/HMS";

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB!!!')
})

const db = mongoose.connection;

//open connection
//normal funtion also can use
/*
db.once('open',()=>{

    console.log("Mongodb Connection Success");

})
*///




const appoinmentRouter = require("./appointments/routes");
app.use("/appoinment", appoinmentRouter);

const sheduleEmail = require("./routes/sheduleemail.js");
app.use("/sheduleEmail", sheduleEmail);


const labAppoinmentRouter = require("./labAppointments/routes");
app.use("/Appoinment_slip", express.static("Appoinment_slip"));
app.use("/labappoinment", labAppoinmentRouter);

const doctorRouter = require("./doctors/routes.js");
app.use("/doctor", doctorRouter);
app.use("/images", express.static("images"));


const reportRouter = require("./labReports/routes");
const bloodreportRouter = require("./bloodReports/routes");
const labitemsinventory = require("./routes/labitemsinventory");
app.use("/report", reportRouter);//load the reports file inside the route folder
app.use("/bloodreport", bloodreportRouter);
app.use("/labitemsinventory", labitemsinventory);


const roomBookRoutes = require("./controller/roomBookController")
const inventoryRoutes = require("./controller/inventoryController")
const maintenanceRoutes = require("./controller/maintenanceController")
app.use('/api', roomBookRoutes)
app.use('/api', inventoryRoutes)
app.use('/api', maintenanceRoutes)


const pharmacyRouter = require("./pharmacies/routes");
const updateTotal = require("./updateTotal/routes")
const Medicine = require("./medicine/routes");

app.use("/pha", pharmacyRouter);
app.use("/Prescriptions", express.static("Prescriptions"));
app.use("/upd", updateTotal);
app.use("/med", Medicine);

const patientRouter = require("./PatientAuth/routes.js");

app.use("/patient", patientRouter);  //load patient js
app.use("/ProfilePic", express.static("ProfilePic"));

const CustomerRouter = require("./customers/routes");
app.use("/customer", CustomerRouter);

// const doctorRouter = require("./routes/doctors.js");
const salaryRouter = require("./routes/salary.js");

// app.use("/doctor", doctorRouter);//load doctors.js
app.use("/DoctorImage", express.static("DoctorImage"));
app.use("/salary", salaryRouter);//load salary.js

const sheduleUpdate = require("./appointments/autoRoute");
app.use("/appinmentAutoup", sheduleUpdate);

const VideoConsultant = require("./consults/routes");
app.use("/vconsult", VideoConsultant);

const paymentRoutes = require('./controller/paymentController')
const salaryRoutes = require('./controller/salaryController')
app.use('/api', paymentRoutes)
app.use('/api', salaryRoutes)

const loginRoutes = require('./login/routes.js')
app.use('/auth', loginRoutes)

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})

