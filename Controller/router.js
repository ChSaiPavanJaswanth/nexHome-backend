const express = require("express");
const nexHomeRouter = express.Router();
const nexHomeSchema = require("../model/schema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const sellSchema = require("../model/sellSchema");

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
  nexHomeSchema.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) return err;
    else res.json(data);
  });
});

nexHomeRouter.post("/propertyDel/:id", async (req, res) => {
  var ind;

  let data = await nexHomeSchema.findById(req.params.id);
  data.sold.map((item, index) => {
    if (item.id === req.body.id) {
      ind = index;
    }
  });

  data.sold.splice(ind, 1);
  await data.save();

  res.status(200).json(data);
});

nexHomeRouter.patch("/updateSellData/:id", async (req, res) => {
  let id = req.params.id;
  let data = await nexHomeSchema.findById(id);

  data.sold.push(req.body);
  await data.save();

  res.status(200).json({
    message: "success",
    data,
  });
});

nexHomeRouter.patch("/wishlist/:id", async (req, res) => {
  let data = await sellSchema.findById(req.body.id);
  // console.log(data);

  let user = await nexHomeSchema.findById(req.params.id);
  // console.log("User");
  // console.log(user.wishList);
  user.wishList.push(data);
  await user.save();

  res.status(200).json({ msg: "Sucess", user: user });
});

nexHomeRouter.get("/getWishList/:id", async (req, res) => {
  let data = await nexHomeSchema.findById(req.params.id);
  res.status(200).json(data.wishList);
});

nexHomeRouter.patch("/delWish/:id", async (req, res) => {
  let ind;
  // console.log(req.params.id);
  let user = await nexHomeSchema.findById(req.params.id);
  // console.log(data.wishList);

  let data = await sellSchema.findById(req.body.id);
  // console.log(user.wishList.find(data));
  // console.log(user.wishList.findIndex(data));
  user.wishList.map((item, index) => {
    if (item.id === req.body.id) {
      ind = index;
    }
  });
  // console.log(ind);
  user.wishList.splice(ind, 1);
  await user.save();

  res.status(200).json(user);
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
