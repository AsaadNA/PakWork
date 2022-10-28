const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send("Unauthorized");
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.locals.userType = decoded.data.user_type;
      res.locals.userID =
        decoded.data.freelancer_id ||
        decoded.data.client_id ||
        decoded.data.company_client_id ||
        decoded.data.admin_id;
    } catch (err) {
      return res.status(401).send("Invalid token");
    }

    return next();
  }
};

module.exports = verifyToken;
