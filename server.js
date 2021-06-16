require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");
const axios = require("axios");
const FormData = require("form-data");

// CONNECT DB
connectDB();

const app = express();

app.use(function (req, res, next) {
  var allowedOrigins = [
    process.env.FRONTEND_URI,
    process.env.FRONTEND_URI,
    "http:/localhost:3000/",
    "http://localhost:3000",
    "https://predecta.netlify.app/",
    "https://predecta.netlify.app"
  ];
  var origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin); // restrict it to the required domain
  }
  res.header(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});

app.use(express.json());
app.use(express.urlencoded({}));

app.use("/api/auth", require("./routes/auth"));

app.post("/predict", (req, res) => {
  let { body } = req;
  // make axios call

  let formData = new FormData();
  formData.append("LIMIT", body.limitAmount);
  formData.append("SEX", body.sex);
  formData.append("EDUCATION", body.education);
  formData.append("MARRIAGE", body.marriage);
  formData.append("AGE", body.age);
  formData.append("PAY_0", body.repaymentApril);
  formData.append("PAY_2", body.repaymentMay);
  formData.append("PAY_3", body.repaymentJune);
  formData.append("PAY_4", body.repaymentJuly);
  formData.append("PAY_5", body.repaymentAug);
  formData.append("PAY_6", body.repaymentSept);
  formData.append("BILL_AMT1", body.billstatementApril);
  formData.append("BILL_AMT2", body.billstatementMay);
  formData.append("BILL_AMT3", body.billstatementJune);
  formData.append("BILL_AMT4", body.billstatementJuly);
  formData.append("BILL_AMT5", body.billstatementAugust);
  formData.append("BILL_AMT6", body.billstatementSeptember);
  formData.append("PAY_AMT1", body.previousPaymentApril);
  formData.append("PAY_AMT2", body.previousPaymentMay);
  formData.append("PAY_AMT3", body.previousPaymentJune);
  formData.append("PAY_AMT4", body.previousPaymentJuly);
  formData.append("PAY_AMT5", body.previousPaymentAugust);
  formData.append("PAY_AMT6", body.previousPaymentSeptember);
  var config = {
    method: "post",
    url: "https://predictzs.herokuapp.com/predict",
    headers: {
      ...formData.getHeaders(),
    },
    data: formData,
  };
  axios(config)
    .then((response) => {
      
      res.status(200).send({ data: response.data });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ data: "An error occured" });
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 😎😎`);
});
