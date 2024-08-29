import React, { useEffect, useState } from 'react'

const Home = () => {
  const [error, setError] = useState(false);
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    const getAllBlogs = async ()=>{
      try{
        setLoading(true);
        setError(false);
        const res = await fetch('/api/getAll', {
          method: "GET"
        });
        
        const data = await res.json();
        setBlogList(data);
        setLoading(false);
      }catch(err){
        setError(err);
      }
    }
    getAllBlogs();
  }, []);

  if(loading){
    return <p className='font-bold text-3xl p-5'>Loading...</p>
  }

  if(error){
    return <p className='font-bold text-3xl p-5'>{error}</p>
  }


  return (
    <div>
      {
        blogList && blogList.length > 0 && blogList.map((blog, _)=>(
          <div>{blog.title}</div>
        ))
      }

    </div>
  )
}

export default Home
