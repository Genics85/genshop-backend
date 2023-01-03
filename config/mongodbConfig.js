const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const mongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error(`${error} occured while connecting to mongodb`);
  }
};

module.exports = mongoConnection;
