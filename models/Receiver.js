const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const requestSchema = new mongoose.Schema({
    hospital:{type:String},
    quantity:{type:Number}
})
const receiverSchema = new mongoose.Schema({
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
  bloodGroup:{
    type:String,
    required:[true,"Please Provide the blood Group"]
  },
  requests:{
    type:[requestSchema],
    default:undefined
  }
  

});


receiverSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
  
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });

  const Receiver = mongoose.model("Receiver",receiverSchema)

  module.exports = Receiver