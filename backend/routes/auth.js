const router = require("express").Router();
const { findOne } = require("../models/User");
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')



router.post("/register", async (req, res) => {
  const { error } = await registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(req.body.password,salt)
  // const hashedPassword = passwordHash.generate(req.body.password);


  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (error) {
    res.status(400).send(error);
  }

});

router.post("/login", async (req, res) => {
  const { error } = await loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid Password");

  //Create and assign a token
  const  token = jwt.sign({_id:user.id},process.env.TOKEN_SECRET,{expiresIn:'1h'})
  res.header('auth-token',token).send(token)

  res.send("Logged in");
});

module.exports = router;
