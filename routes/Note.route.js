const express = require("express");
const { NoteModel } = require("../models/note.model");
const noteRouter = express.Router();
noteRouter.get("/", async (req, res) => {
  try {
    let data = await NoteModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const new_note = new NoteModel(payload);
    await new_note.save();
    res.send("created new note");
  } catch (error) {
    console.log(error);
    res, send({ msg: "something went wrong" });
  }

});

noteRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const note = await NoteModel.findOne({ _id: id });
  const userID_in_note = note.userID;
  const userID_making_req = req.body.userID;
  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "you are not authorised" });
    } else {
      await NoteModel.findByIdAndUpdate({ _id: id }, payload);
      res.send("updated the note");
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: "something went wrong" });
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  //need to verify token
  const id = req.params.id;
  const note = await NoteModel.findOne({ _id: id });
  const userID_in_note = note.userID;
  const userID_making_req = req.body.userID;
  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "you are not authorised" });
    } else {
      await NoteModel.findByIdAndDelete({ _id: id });
      res.send("deleted the note");
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: "something went wrong" });
  }
});

module.exports = { noteRouter };
