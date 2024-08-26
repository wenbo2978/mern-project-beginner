import React from 'react'
import {Link} from "react-router-dom"

const Header = () => {
  return (
    <div className='flex justify-between p-3 bg-slate-50 items-center'>
      <div className='text-slate-800 text-3xl font-bold cursor-pointer'>
        Blog
      </div>
      <div className='flex items-center gap-3'>
        <input type='text' className='border h-10 w-[200px] sm:w-[350px] rounded-lg'/>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>

      </div>
      <div>
        <ul className='flex gap-3'>
          <Link to={'/'}>
            <li className='hover:underline cursor-pointer'>Home</li>
          </Link>
          <Link to={'/add'}>
            <li className='hover:underline cursor-pointer'>Add</li>
          </Link>
          
          <Link to={'/about'}>
            <li className='hover:underline cursor-pointer'>About</li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Header
