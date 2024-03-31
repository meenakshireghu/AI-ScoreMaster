import { useState } from 'react';
import { useSelector } from 'react-redux'
import { updateUserStart, updateUserFailure ,updateUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';



export default function Profile() {
  const {currentUser} = useSelector((state) => state.user);
  const [formData ,setFormData] = useState({});
  const dispatch = useDispatch();
  

  const handleChange = (e) => {
    setFormData({ ...FormData , [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
          dispatch(updateUserStart());
          const res = await fetch ('/api/user/update/${ currentUser._id}',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (data.success == false){
            dispatch(updateUserFailure(error.message));
            return;
          }
          dispatch(updateUserSuccess(data));

    } catch (error){
        dispatch(updateUserFailure(error.message));
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text -3xl font- semibold text-center my-7'>Profile</h1>
      <form onSubmit = {handleSubmit }className='flex flex-col gap-4'>
        <img src= { currentUser.avatar} alt ="profile" 
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
        <input 
         type='text'
         placeholder='username'
         defaultValue ={currentUser.username}
         id ='username' 
         className='border p-3 rounded-lg'
         onChange={handleChange}
         />

        <input
          type='text'
           placeholder='email'
           id ='email' 
           defaultValue ={currentUser.email}
           className='border p-3 rounded-lg'
           onChange={handleChange}
           />

        <input
         type='text'
          placeholder='password'
         id ='password' 
         className='border p-3 rounded-lg'
         />

        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover: opacity-95 disabled:opacity-80'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-black-700 cursor-pointer '>Delete Account</span>
        <span className='text-black-700 cursor-pointer '>Sign Out</span>
      </div>
    </div>
  )
}

