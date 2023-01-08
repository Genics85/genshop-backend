require("dotenv").config();
const express = require("express");
const { mongoose } = require("mongoose");
const app = express();
const mongoConnection = require("./config/mongodbConfig");
const logger = require("./middlewares/logger");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

//Connecting to mongodb
mongoConnection();

//middleware for loggin
app.use(logger);

//middleware for cross origin resource sharing
app.use(cors());

//middleware for user route
app.use(express.json());
app.use("/product",require("./routes/product"));
app.use("/user", require("./routes/user"));
app.use("/secure", require("./routes/secure"));

mongoose.connection.once("open", () => {
  app.listen(PORT, (req, res) => {
    console.log(`listening for connections on port ${PORT}`);
  });
});
