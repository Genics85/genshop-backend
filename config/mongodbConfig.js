const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const mongoConnection = async () => {
  await mongoose.connect(process.env.MONGODB_URI, (req, res) => {
    console.log("connected to database");
  });
};

module.exports = mongoConnection