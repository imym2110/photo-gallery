const express = require("express");
const port = 3001;
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require("./Helper/mongous");
const cors = require("cors");
app.use(cors());
const Image = require("./modals/mongooseScheema");


//Calls
app.post("/upload", (req, res, next) => {
  console.log("===>", req.body);
  const imgGallery = new Image(req.body);
  imgGallery
    .save()
    .then((responce) => {
      res.status(201).send(responce);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});
app.get("/getImage", (req, res, next) => {
  if (req.query.searchTitle) {
    Image.find({ title: { $regex: req.query.searchTitle, $options: "i" } })
      .then((responce) => {
        res.status(200).send(responce);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  } else {
    Image.find()
      .then((responce) => {
        res.status(200).send(responce);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
});

app.listen(port, () => {
  console.log("App is running on port " + port);
});
