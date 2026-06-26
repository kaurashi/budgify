const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/userModel");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await findUserByEmail(email);
  if (userExists) {
    return res.status(400).json({ message: "user already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser(name, email, hashedPassword);

  res.json({
    message: "Signup successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
};

const login = async (req, res) => {
  console.log("LOGIN STARTED");
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "invalid password" });
  }
   
  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ message: "login successful", token });
};

module.exports = { signup, login };