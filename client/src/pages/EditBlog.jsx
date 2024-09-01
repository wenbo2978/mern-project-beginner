import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';

const EditBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState();
  const [contentList, setContentList] = useState([]);
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);
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
        const {title, body} = data;
        setTitle(title);
        setContentList(body);
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
  const handleAddContent = () => {
    setContentList([...contentList, content]);
    setContent('');
  }
  const handleDelete = (index) => {
    //console.log(index);
    setContentList(contentList.filter((_, i) => i !== index));
  }
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    console.log('submit');
    if(contentList.length == 0){
      setError("length of paragraph should be larger than zero!!!")
    }else{
      setError(false);
      try{
        const res = await fetch(`/api/updateBlog/${params.id}`, {
          method: 'post',
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify({
            "title": title,
            "body": contentList
          })
        })
        const data = await res.json();

        if(data == 'ok'){
          setRedirect(true);
        }else{
          setError(data.message);
        }
    
      }catch(err){
        setError(err);
      }
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (
    <div className='flex flex-row p-3 mx-auto max-w-3xl gap-2 mt-10 m-5'>
      <div className='w-full border rounded-lg p-2'>
        <form onSubmit={handleSubmit}>
          <button className='bg-green-600 w-[200px] h-[50px] rounded-lg text-white font-bold text-2xl'>Update</button>
          <div className='flex flex-col'>
            <span className='mt-2 font-semibold text-lg'>Title:</span>
            <input 
              value={title}
              type='text' 
              placeholder='title...'
              className='border rounded-lg h-[35px] p-2 text-lg mt-2'
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <span className='mt-2 font-semibold text-lg'>Body:</span>
            <textarea 
              value={content} 
              className='border rounded-lg h-[150px] p-2 text-lg mt-2'
              onChange={ev => setContent(ev.target.value)} />
            <button 
              type='button' 
              onClick={handleAddContent}
              className='mt-2 bg-blue-500 rounded-lg h-[30px] text-white font-semibold text-lg'  
            >
                add paragraph
              </button>
          </div>
        </form>
        <p className='text-red-700 font-bold text-lg mt-5'>
          {
            error
          }
        </p>
      </div>
      <div className='w-full border rounded-lg p-2'>
        <p className='font-bold text-2xl border-b-2 pb-3'>{title}</p>
        {
          contentList.length > 0 && contentList.map((con, index)=>(
            <div key={index} className='flex flex-col gap-2'>
              <p className='text-slate-600 text-lg'>{con}</p>
              <button onClick={()=>handleDelete(index)}
                className='my-2'  
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>

              </button>
            </div>
          ))
        }
        <p>{content}</p>
      </div>
    </div>
  )
}

export default EditBlog
