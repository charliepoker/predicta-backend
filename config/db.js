const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    })
    .then(() => {
      console.log(`Database is connected 🎉🎉`);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = connectDB;
