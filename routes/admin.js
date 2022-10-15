const router = require("express").Router();
const Admin = require("../models/Admin");
const Petani = require("../models/Petani");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  adminRegisterValidation,
  loginValidation,
} = require("../component/validation");
const authenticateAdminJWT = require("../component/verifyTokenAdmin");

//POST REGISTER

router.post("/register", async (req, res) => {
  const { error } = adminRegisterValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if phone number already exists
  const phoneNumberExist = await Admin.findOne({
    phoneNumber: req.body.phoneNumber,
  });
  if (phoneNumberExist)
    return res.status(400).send("Nomor telepon sudah terdaftar");

  //checking if username already exists
  const userNameExist = await Admin.findOne({
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
  const admin = new Admin({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    userName: req.body.userName,
    password: hashedPassword,
  });
  try {
    const savedAdmin = await admin.save();
    res.status(201).send({
      status: "success",
      message: "Admin created successfully",
      data: {
        admin: savedAdmin,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//POST LOGIN

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if username exists
  const admin = await Admin.findOne({
    userName: req.body.userName,
  });
  if (!admin) return res.status(400).send("Username atau password salah");

  //checking if password is correct
  const validPass = await bcrypt.compareSync(req.body.password, admin.password);
  if (!validPass) return res.status(400).send("Username atau password salah");

  //Create and assign token
  const token = jwt.sign(
    {
      _id: admin._id,
      email: admin.email,
    },
    process.env.TOKEN_ADMIN_SECRET
  );
  res
    .header("x-auth-token-admin", token)
    .status(201)
    .send({
      status: "success",
      message: "Admin login successfully",
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        phoneNumber: admin.phoneNumber,
        userName: admin.userName,
        role: admin.role,
      },
      accessToken: token,
    });
});

// GET ALL PETANI

router.get("/petani", authenticateAdminJWT, async (req, res) => {
  try {
    const petani = await Petani.find();
    res.status(200).send({
      status: "success",
      message: "Get all petani successfully",
      data: {
        petani,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// GET PETANI BY ID

router.get("/petani/:id", authenticateAdminJWT, async (req, res) => {
  try {
    const petani = await Petani.findById(req.params.id);
    res.status(200).send({
      status: "success",
      message: "Get petani by id successfully",
      data: {
        petani,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// DELETE PETANI BY ID

router.delete("/petani/:id", authenticateAdminJWT, async (req, res) => {
  try {
    const petani = await Petani.findByIdAndDelete(req.params.id);
    res.status(200).send({
      status: "success",
      message: "Delete petani by id successfully",
      data: {
        petani,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// UPDATE PETANI BY ID

router.patch("/petani/:id", authenticateAdminJWT, async (req, res) => {
  try {
    const updatePetani = await Petani.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          password: req.body.password,
        },
      }
    );
    res.json(updatePetani);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
