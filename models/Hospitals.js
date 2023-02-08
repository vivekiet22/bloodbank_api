const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const bloodSampleSchema = new mongoose.Schema({
  bloodGroup:{type:String},
  quantity:{type:Number},
})
// const requestersSchema = new mongoose.Schema({
//   patiet_name:{type:String},
//   quantity:{type:Number}
// })
// const requestSchema = new mongoose.Schema({
//   bloodGroup:{type:String},
//   requester:{
//     type:[requestersSchema],
//     default:undefined
//   }
// })
const requestSchema = new mongoose.Schema({
  bloodGroup:{type:String},
  name:{type:String},
  quantity:{type:Number}
  
})


const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email:{
    type:String,
    required:[true,"Please provide a email"],
    unique:true,
    validate:[validator.isEmail,"Please provide a valid email"]
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
  },
  address:{
    type:String,
    required:[true,"Please provide a address"],
  },
  contact:{
    type:Number
  },
  bloodSamples:{
    type:[bloodSampleSchema]
    ,default:undefined
  },
  requests:{
    type:[requestSchema],
    default:undefined
  }


});


hospitalSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
  
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });

  const Hospital = mongoose.model("Hospital",hospitalSchema)

  module.exports = Hospital