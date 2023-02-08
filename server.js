
const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

const morgan = require("morgan");

const Hospitals = require("./models/Hospitals")
// routes
const hospitalRoute = require("./routes/hospitalRoute")
const receiverRoute = require("./routes/receiverRoute")

dotenv.config()

const app = express();


const DB = 'mongodb://127.0.0.1:27017/bloodbank'
try {
    mongoose.connect(DB).then(()=>console.log("Connected to DB Successfully"));
  } catch (error) {
    handleError(error);
  }


app.use(express.json())

app.use(morgan("dev"));


// app.use('/',  async (req, res)=> {
//       hospitals = await Hospitals.find()
//       res.send(hospitals);
//  })

 app.use("/api/receiver",receiverRoute)
 app.use("/api/hospitals",hospitalRoute)



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});
