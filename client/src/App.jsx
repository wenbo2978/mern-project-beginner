import React from 'react'
import {Routes, Route, BrowserRouter} from "react-router-dom"
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import AddBlog from './pages/AddBlog.jsx'
import Blog from './pages/Blog.jsx'
import Header from './component/Header.jsx'
import EditBlog from './pages/EditBlog.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/add' element={<AddBlog/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path='/editBlog/:id' element={<EditBlog/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

