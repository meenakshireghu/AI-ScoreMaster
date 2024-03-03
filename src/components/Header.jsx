import React from 'react'
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className=' bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center p-3'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>AI</span>
            <span  className='text-slate-700'>ScoreMaster</span>
        </h1>
        <ul className='flex gap-4'>
           <Link to= '/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>Home </li>
            </Link>
            <Link to= '/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>About </li>
            </Link>
            <Link to= '/sign-in'>
            <li className=' text-slate-700 hover:underline'>Sign in </li> 
            </Link>    
        </ul>
         </div>
        </header>
  )
}

