const express = require("express");
const sellRouter = express.Router();
const sellSchema = require("../model/sellSchema");

sellRouter.post("/create-sell", (req, res) => {
  sellSchema.create(req.body, (err, data) => {
    if (err) {
      return err;
    } else {
      res.status(200).json(data);
    }
  });
});

sellRouter.get("/", (req, res) => {
  // sellSchema.find((err, data) => {
  //   if (err) {
  //     return err;
  //   } else {
  //     res.json(data);
  //   }
  // });
  sellSchema
    .find()
    .sort({ createdAt: -1 }) // Sort by createdAt in descending order (latest first)
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else {
        res.json(data);
      }
    });
});

sellRouter.delete("/deletePropert/:id", (req, res) => {
  // console.log("DElete called");

  sellSchema.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) return err;
    else res.json(data);
  });

  // res.status(200).json({
  //   msg: "Sucess",
  // });
});

module.exports = sellRouter;

/*
app.get()
app.post()
app.put()
app.delete()
--------------------
app.use()
*/
