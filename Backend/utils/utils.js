const jwt = require("jsonwebtoken");

module.exports.generateToken = (userId, res) => {
   const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};
