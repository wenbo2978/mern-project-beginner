import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: Array,
    required: true,
  },
})

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;