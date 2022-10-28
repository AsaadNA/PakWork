const mongoose = require("mongoose");
const emailVerificationSchema = new mongoose.Schema({
  uid: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  userType: {
    type: String,
    require: true,
  },

  createdAt: {
    type: Date,
    expires: parseInt(process.env.TOKEN_EXPIRY_TIME),
    default: Date.now,
  },
});

module.exports = mongoose.model("emailVerifications", emailVerificationSchema);
