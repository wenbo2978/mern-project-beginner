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

app.post('/api/add', async (req, res) => {
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

app.get('/api/getAll', async (req, res) => {
  try{
    const data = await Blog.find();
    //console.log(data);
    res.json(data);
  }catch(err){
    //console.log('err');
    res.json(err);
  }
})

app.delete('/api/delete/:id', async (req, res) => {
  try{
    const blog = await Blog.findById(req.params.id);
    if(!blog)
      return res.json('no data');
    await Blog.findByIdAndDelete(req.params.id);
    res.json('ok');
  }catch(err){
    res.json(err);
  }
})

app.get('/api/getBlog/:id', async (req, res) => {
  try{
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  }catch(err){
    res.json(err);
  }
})