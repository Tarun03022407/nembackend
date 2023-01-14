const express = require("express");
const app = express();
const cors = require("cors")
// const jwt = require("jsonwebtoken");
// const bcrypt=require("bcrypt")
const {authenticate} = require("./middlewares/authenticate.middleware")

const {userRouter}=require("./routes/user.routes")
const {noteRouter} =require("./routes/Note.route")
app.use(express.json());
app.use(cors({
  origin: '*'
}));
const { connection } = require("./configs/db");
app.use("/users",userRouter)
// const { UserModel } = require("./models/users.model");
app.use(authenticate)
app.use("/notes",noteRouter)
app.use('/',(req,res)=>{
  res.send("homepage")
})



app.listen(process.env.port, async () => {
  try {
    await connection;
    // console.log(connection);
    console.log("connected to db");
  } catch (error) {
    console.log(error);
    // res.send("something went wrong")
  }
  console.log(`server running at ${process.env.port} `);
});
