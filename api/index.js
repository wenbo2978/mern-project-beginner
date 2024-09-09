import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import blogRouter from './routes/blogRoute.js'

dotenv.config();

mongoose.connect(process.env.MONGOOSE).then(()=>{
  console.log("connect success");
}).catch((err) => {
  console.log(err);
})

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log('server is running on 3000__!!!');
})

app.use(blogRouter);
