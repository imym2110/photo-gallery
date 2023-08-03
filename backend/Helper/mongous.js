const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://maniaryash21:yash2110@cluster0.aw9ssbv.mongodb.net/?retryWrites=true&w=majority`
  )
  .then((res) => {
    console.log("Mongoose Connected Sucessfully");
  })
  .catch((err) => {
    console.log(err);
  });
