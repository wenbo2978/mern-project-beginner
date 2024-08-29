import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGOOSE).then(()=>{
  console.log("connect success");
}).catch((err) => {
  console.log(err);
})

const app = express();

app.listen(3000, () => {
  console.log('server is running on 3000__!!!');
})

app.get("/test", (req, res) => {
  res.json("test");
  console.log("works");
})