import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const [blogData, setBlogData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(()=>{
    setLoading(true);
    const id = params.id;
    const getBlogById = async () => {
      try{
        const res = await fetch(`/api/getBlog/${id}`, {
          method: 'GET'
        })
        const data = await res.json();
        //console.log(data);
        setLoading(false);
        setBlogData(data);
      }catch(err){
        setLoading(false);
        setError(err);
      }
    }
    getBlogById();
  }, [])
  if(loading){
    return <p className='text-3xl font-bold p-3'>Loading...</p>
  }
  return (
    <div className='px-4 mt-5 py-2'>
      {
        blogData && (
          <div>
            <p className='text-3xl font-bold border-b-4 pb-2 mb-2'>{blogData.title}</p>
            {
              blogData.body && blogData.body.length > 0 && blogData.body.map((content, index) => (
                <p key={index} className='mt-5 text-slate-500'>{content}</p>
              ))
            }
          </div>
          

        )
      }
    </div>
  )
}

export default Blog
