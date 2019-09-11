const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UserModel, RoleModel } = require("../models/User");

const AdminAuthorization = require("../AdminAuthorization");

router.get("/:username", AdminAuthorization, async (req, res) => {
  const findUser = await UserModel.findOne({ username: req.params.username });
  if (!findUser)
    return res.status(403).json({
      success: false,
      message: "Username not found",
    });
  return res.json(findUser);
});

router.post("/register", async (req, res) => {
  const { username, password, email, fullname } = req.body;

  const findUser = await UserModel.findOne({ username });
  if (findUser)
    return res.status(403).json({
      success: false,
      message: "Username is taken",
    });

  const salt = await bcrypt.genSalt(8);
  const hashPass = await bcrypt.hash(password, salt);

  const member = await RoleModel.findOne({ name: "Member" });

  const user = new UserModel({
    username,
    password: hashPass,
    email,
    fullname,
    role: member._id,
  });

  try {
    const saveUser = await user.save();
    return res.send(saveUser);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // const { error } = loginValidation(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const loginUser = await UserModel.findOne({ username });
  if (!loginUser)
    return res.status(401).json({
      success: false,
      message: "Username is not exists",
    });
  const validPass = await bcrypt.compare(password, loginUser.password);
  if (!validPass)
    return res.status(401).json({
      success: false,
      message: "Password is wrong",
    });

  const token = jwt.sign(
    { _id: loginUser._id, role: loginUser.role },
    process.env.JWT_SECRET
  );
  res.header("auth-token", token).json({
    success: true,
    token,
  });
});

router.post("/role", async (req, res) => {
  const { name } = req.body;

  const newRole = new RoleModel({
    name: name,
  });

  try {
    const saveRole = await newRole.save();
    return res.send(saveRole);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
