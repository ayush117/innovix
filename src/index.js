const express = require("express");
const mongoose = require("mongoose");
const faqsRouter = require("./routes/RouteFaq.js");
const userRouter = require("./routes/RouteUser.js");
const auth = require('./routes/auth');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');
const cors = require("cors");

if (!config.get('PrivateKey')) {
  console.error('FATAL ERROR: PrivateKey is not defined.');
  process.exit(1);
}
const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb+srv://krish:krish@cluster0.i2po0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors());
app.use(faqsRouter);
// app.use(userRouter);
app.use('/api/auth', auth);
app.use('/api/users', userRouter);

app.listen(3001, () => {
  console.log("Server is running...");
});
