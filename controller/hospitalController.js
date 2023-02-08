const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Hospital = require("../models/Hospitals");

// register
exports.register = async (req, res) => {
  const { name, email, password, address } = req.body;
  let hospital = await Hospital.findOne({ email });
  try {
    if (hospital) {
      return res
        .status(400)
        .json({ status: "error", msg: "Receiver already Exsit" });
    }
    hospital = await Hospital.create({ name, email, password, address });
    const token = jwt.sign({ id: hospital.id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    res.status(201).json({ status: "success", data: { hospital, token } });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: "error", msg: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hospital = await Hospital.findOne({ email }).select("+password");

    if (hospital && (await bcrypt.compare(password, hospital.password))) {
      const token = jwt.sign({ id: hospital.id }, process.env.JWT_SECRET, {
        expiresIn: 3600,
      });
      res.status(200).json({ status: "success", data: { token } });
    } else {
      res.status(400).json({ status: "fail", msg: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(400).json({ status: "fail", msg: err.message });
  }
};

exports.delete = async (req, res) => {
  const { email, bloodtype } = req.body;
  try {
    console.log("started");

    let hos = await Hospital.findOne({ email });
    let samples = await hos.bloodSamples;
    let sampleUpdated = await samples.filter(
      (blood) => blood.bloodGroup !== bloodtype
    );
    console.log(sampleUpdated);
    let update = await { bloodSamples: sampleUpdated };

    let doc = await Hospital.findOneAndUpdate({ email }, update);
    await doc.save();
    res.status(201).json({ status: "success", msg: "deleted" });
  } catch (err) {
    console.log("failed");
    res.status(400).json({ status: "fail", msg: err.message });
  }
};

exports.update = async (req, res) => {
  const { email, bloodGroup, quantity } = req.body;
  try {
    let filter = { email };
    let user = await Hospital.findOne(filter);
    let bloodSamples = await user.bloodSamples;

    let update = await {
      bloodSamples: [
        ...bloodSamples,
        { bloodGroup: bloodGroup, quantity: quantity },
      ],
    };
    let doc = await Hospital.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true, // Make this update into an upsert
    });
    await doc.save();
    res.status(201).json({ status: "success", msg: "created" });
  } catch (err) {
    console.log("failed");
    res.status(400).json({ status: "fail", msg: err.message });
  }
};

// getall blood info
exports.getblood = async (req, res) => {
  const { email } = req.body;
  let hospital = await Hospital.findOne({ email });
  try {
    let samples = await hospital.bloodSamples;
    await res.send(samples);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: "error", msg: err.message });
  }
};
// getall receivers info
exports.getreceiver = async (req, res) => {
  const { email, bloodtype } = req.body;
  let hospital = await Hospital.findOne({ email });
  try {
    let samples = await hospital.requests.bloodtype;
    await res.send(samples);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: "error", msg: err.message });
  }
};

// getAllInfo
exports.getAllInfo = async (req, res) => {
  try {
    console.log("start");
    let hospitals = await Hospital.find();
    let allInfo = []
    for await(const data of hospitals){
    allInfo = [...allInfo,{name:data.name,samples:data.bloodSamples}]
    }
    await hospitals.map(async (data) =>allInfo = [...allInfo,{name:data.name,samples:data.bloodSamples}]) ;
    res.send(allInfo)
    // res.status(201).json({ status: "success", msg: "got successfully" });
  } catch (err) {
    // console.log(err.message);
    res.status(400).json({ status: "error", msg: err.message });
  }
};
