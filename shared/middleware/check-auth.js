const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    //console.log(req.headers.authorization.split(" ")[1]);
    jwt.verify(token, "token_validator");
    //console.log("Authorized");
    next();
  } catch (error) {
    //console.log("NOT Authorized");
    // console.log(error);

    res.status(401).json({ message: "Auth failed!" });
  }
};
