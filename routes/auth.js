const router = require("express").Router();
const User = require("../models/User");
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
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //checking if phone number already exists
  const phoneNumberExist = await User.findOne({
    phoneNumber: req.body.phoneNumber,
  });
  if (phoneNumberExist)
    return res.status(400).send("Nomor telepon sudah terdaftar");

  //checking if username already exists
  const userNameExist = await User.findOne({
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

  //create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    phoneNumber: req.body.phoneNumber,
    userName: req.body.userName,
  });
  try {
    const userSaved = await user.save();
    res.status(201).send({
      status: "success",
      message: "User berhasil ditambahkan",
      data: {
        user: userSaved,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if user already exists
  const user = await User.findOne({ userName: req.body.userName });
  if (!user) return res.status(400).send("Username atau password salah");

  //Checking if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Username atau password salah");

  //Create token
  const token = jwt.sign(
    { _id: user._id, email: user.userName },
    process.env.TOKEN_SECRET,
    { expiresIn: "2h" }
  );
  user.token = token;
  res
    .header("x-auth-token", token)
    .status(200)
    .send({
      status: "success",
      message: "User berhasil login",
      data: {
        _id: user._id,
        name: user.name,
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
      accessToken: token,
    });
});

module.exports = router;
