const express = require("express");
const sellRouter = express.Router();
const sellSchema = require("../model/sellSchema");
const mongoose = require("mongoose");

sellRouter.post("/create-sell", (req, res) => {
  sellSchema.create(req.body, (err, data) => {
    if (err) {
      return err;
    } else {
      res.json(data);
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

module.exports = sellRouter;

/*
app.get()
app.post()
app.put()
app.delete()
--------------------
app.use()
*/
