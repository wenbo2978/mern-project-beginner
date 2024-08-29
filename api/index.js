import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "./models/blog.model.js";

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

app.get("/test", (req, res) => {
  res.json("test");
  console.log("works");
})

app.post('/add', async (req, res) => {
  try{
    const {title, body} = req.body;
    //console.log(title);
    //console.log(body);
    const newBlog = new Blog({title, body});
    await newBlog.save();
    res.json('ok');
  }catch(err){
    res.json(err);
  }
})

app.get('/getAll', async (req, res) => {
  try{
    const data = await Blog.find();
    res.json(data);
  }catch(err){
    res.json(err);
  }
})