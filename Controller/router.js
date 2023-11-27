const express = require("express");
const nexHomeRouter = express.Router();
const nexHomeSchema = require("../model/schema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

nexHomeRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  nexHomeSchema.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        const token = jwt.sign({ id: user._id }, "kafjvjdfv9h43t58b");
        const { password: pass, ...rest } = user._doc;
        res.cookie("access_token", token, { httpOnly: true }).status(200).json({
          userData: rest,
          msg: "Sucess",
        });
      } else {
        res.json({ msg: "Password is wrong" });
      }
    } else {
      res.json({ msg: "Email id is not registered" });
    }
  });
});

nexHomeRouter.post("/create-nexHome", (req, res) => {
  const data = req.body;
  nexHomeSchema.findOne({ email: data.email }).then((user) => {
    if (user) {
      res.json("User already exixts");
    } else {
      nexHomeSchema.create(req.body, (err, data) => {
        if (err) {
          return err;
        } else {
          res.json(data);
        }
      });
    }
  });
});

nexHomeRouter.get("/", (req, res) => {
  nexHomeSchema.find((err, data) => {
    if (err) {
      return err;
    } else {
      res.json(data);
    }
  });
});

nexHomeRouter.delete("/delete/:id", (req, res) => {
  //console.log("Called");
  nexHomeSchema.findByIdAndDelete(req.params.id, (err, data) => {
    // nexHomeSchema.findByIdAndRemove(req.params.id, (err, data) => {
    //console.log("found");
    if (err) return err;
    else res.json(data);
  });
});

nexHomeRouter.patch("/updateSellData/:id", async (req, res) => {
  let id = req.params.id;
  let data = await nexHomeSchema.findById(id);
  //console.log(data);
  data.sold.push(req.body);
  await data.save();

  res.status(200).json({
    message: "success",
    data,
  });
});

nexHomeRouter.get("/getUser/:id", async (req, res) => {
  //console.log("Function Called");
  let id = req.params.id;
  let data = await nexHomeSchema.findById(id);
  //console.log(data);
  res.status(200).json({
    message: "success",
    dat: data.sold,
  });
});

nexHomeRouter.patch("/edit/:id", async (req, res) => {
  let id = req.params.id;

  let data = await nexHomeSchema.findById(id);

  data.name = req.body.name;
  data.email = req.body.email;
  data.phonenumber = req.body.phonenumber;
  await data.save();
  // console.log(data);
  const { password: pass, ...rest } = data._doc;
  res.status(200).json({
    message: "success",
    user: rest,
  });
});

module.exports = nexHomeRouter;

/*
app.get()
app.post()
app.put()
app.delete()
--------------------
app.use()
*/
