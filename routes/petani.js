const router = require("express").Router();
const Petani = require("../models/Petani");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
} = require("../component/validation");
require("dotenv").config();

//POST REGISTER
router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if user already exists
  const emailExist = await Petani.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email Sudah Terdaftar");

  //checking if phone number already exists
  const phoneNumberExist = await Petani.findOne({
    phoneNumber: req.body.phoneNumber,
  });
  if (phoneNumberExist)
    return res.status(400).send("Nomor telepon sudah terdaftar");

  //checking if username already exists
  const userNameExist = await Petani.findOne({
    userName: req.body.userName,
  });
  if (userNameExist) return res.status(400).send("Username sudah terdaftar");

  //checking if username have space
  const userNameSpace = req.body.userName;
  if (userNameSpace.includes(" ")) {
    return res.status(400).send("Username tidak boleh ada spasi");
  }

  //checking if username have special character
  const userNameSpecial = req.body.userName;
  const regex = /^[a-zA-Z0-9]+$/;
  if (!regex.test(userNameSpecial)) {
    return res.status(400).send("Username tidak boleh ada karakter spesial");
  }

  //checking if username using uppercase
  const userNameUpperCase = req.body.userName;
  if (userNameUpperCase !== userNameUpperCase.toLowerCase()) {
    return res.status(400).send("Username tidak boleh menggunakan huruf besar");
  }
  //checking if password have space
  const passwordSpace = req.body.password;
  if (passwordSpace.includes(" ")) {
    return res.status(400).send("Password tidak boleh ada spasi");
  }

  //Hash password
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

  //Create new user
  const petani = new Petani({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    phoneNumber: req.body.phoneNumber,
    userName: req.body.userName,
  });
  try {
    const savedPetani = await petani.save();
    res.send({ petani: petani._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
