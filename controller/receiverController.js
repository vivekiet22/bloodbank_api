const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Receiver = require("../models/Receiver")

const Hospitals = require("../models/Hospitals")

// register
exports.register = async (req,res) =>{
    const {name,email,password,address,bloodGroup} = req.body;
    let receiver = await Receiver.findOne({email})
    try {
        if (receiver){
            return res.status(400).json({status:'error',msg:"Receiver already Exsit"})
        }
        receiver = await Receiver.create({name,email,password,address,bloodGroup})
        const token = jwt.sign({ id: receiver.id }, process.env.JWT_SECRET, {
            expiresIn: 3600
          });
          res.status(201).json({ status: "success", data: { receiver, token } });
        } catch (err) {
          console.log(err.message);
          res.status(400).json({ status: "error", msg: err.message });
        }
      };

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const receiver = await Receiver.findOne({ email }).select("+password");
  
      if (receiver && (await bcrypt.compare(password, receiver.password))) {
        const token = jwt.sign({ id: receiver.id }, process.env.JWT_SECRET, {
          expiresIn: 3600
        });
        res.status(200).json({ status: "success", data: { token } });
      } else {
        res.status(400).json({ status: "fail", msg: "Invalid Credentials" });
      }
    } catch (err) {
      res.status(400).json({ status: "fail", msg: err.message });
    }
  };

  exports.request = async (req,res)=>{
    const {hospital,quantity,receiverEmail,hospitalEmail} = req.body
    try{
        console.log("started")
        let filter = {email:receiverEmail}
        let user = await Receiver.findOne(filter)
        // console.log(user)
        let requests =await user.requests
        let update = {requests:[...requests,{hospital:hospital,quantity:quantity}]}
        // console.log(requests)
        let doc = await Receiver.findOneAndUpdate(filter,update,{
            new: true,
            upsert: true // Make this update into an upsert
          })
        await doc.save()

        let filter1 = {email:hospitalEmail}
        let hospitals = await Hospitals.findOne(filter1)
        let hospirequests = await hospitals.requests
        let bGroup = await user.bloodGroup
        let update1 = await {requests:[...hospirequests,{ 
          bloodGroup:bGroup,
          name:user.name,
          quantity:quantity
        }]}
        let doc1 = await Hospitals.findOneAndUpdate(filter1,update1,{
          new: true,
          upsert: true // Make this update into an upsert
        })
      await doc1.save()
        res.status(201).json({ status: "success", msg:"created" });
    }
    catch(err) {
        console.log("failed")
        res.status(400).json({ status: "fail", msg: err.message });
      }
  }
