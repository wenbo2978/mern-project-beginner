import { Router } from "express";
import Blog from ".././models/blog.model.js";
const router = Router();


router.post('/api/add', async (req, res) => {
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

router.get('/api/getAll', async (req, res) => {
  try{
    const data = await Blog.find();
    //console.log(data);
    res.json(data);
  }catch(err){
    //console.log('err');
    res.json(err);
  }
})

router.delete('/api/delete/:id', async (req, res) => {
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

router.get('/api/getBlog/:id', async (req, res) => {
  try{
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  }catch(err){
    res.json(err);
  }
})

router.post('/api/updateBlog/:id', async (req, res) => {
  try{
    const blog = await Blog.findById(req.params.id);
    const {title, body} = req.body;
    if(!blog)
      return res.json('no data');
    const newBlod = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        body
      },
      {new: true}
    );
    res.json('ok');
  }catch(err){
    res.json(err);
  }
})



export default router;