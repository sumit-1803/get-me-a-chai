"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const Username = () => {
  const router = useRouter();
 const { username } = router.query || {};

  function getRandomFloat() {
    return Math.floor(Math.random() * (1000 - 1) + 1);
  }

  return (
    <>
      <div className='cover mt-16 w-full bg-red-50 relative'>
        <img className='object-cover w-full h-[350px]' src='https://mytechshout.com/wp-content/uploads/2016/07/Bridge-facebook-HD-cover-photo.jpg' alt='Cover' />
        <div className='absolute -bottom-20 right-[46%] border-black border-2 rounded-full'>
          <img className='rounded-full' width={150} height={150} src='https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150517168.jpg?size=338&ext=jpg&ga=GA1.1.672697106.1717372800&semt=ais_user' alt='Profile' />
        </div>
      </div>
      <div className='info flex justify-center items-center my-24 flex-col '>
        <div>@{username}</div>
        <div className=' font-bold text-lg'>
          CREATING ANIMATED ART FOR VTT'S
        </div>
        <div className='text-slate-600 flex space-x-2'>
          <p>{getRandomFloat()} members  ,</p>
          <p>{getRandomFloat()} posts  ,</p>
          <p>{getRandomFloat()} solutions</p>
        </div>
      </div>

      <div className='payment flex gap-3 w-[80%] mt-12'>
        <div className='supporters w-1/2 bg-slate-900 p-10 rounded-lg text-white p-10'>
          {/* Show list of all the supporters as a leaderboard */}
          <h2 className='text-2xl text-center my-6 font-bold'>Supporters</h2>
          <ul className='mx-4 text-lg'>
            <li className='my-4 flex gap-2 items-center'>
              <img height={64} width={64} src='https://img.icons8.com/?size=100&id=HmQQr0jYHZxu&format=png&color=000000' alt='avatar user'></img>
              <span>
              Shubham donated $30 with a message "I support You Bro ❤️"
              </span>
              </li>
            <li className='my-2'>Shubham donated $30 with a message ""</li>
            <li className='my-2'>Shubham donated $30 with a message ""</li>
            <li className='my-2'>Shubham donated $30 with a message ""</li>
            
          </ul>
            </div>
            <div className='makePayment w-1/2 bg-slate-900 p-10 text-white rounded-lg'>
              <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
              <div className='flex gap-2 flex-col'>

              <input type='text' className='w-full p-3 rounded-lg bg-slate-800' placeholder='Eneter Name'></input>

              <input type='text' className='w-full p-3 rounded-lg bg-slate-800' placeholder='Eneter Message'></input>

                <input type='text' className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount'></input>

                <button type="button" class="text-white  w-32 bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pay Now!</button>
              </div>
              {/* Or Choose From These Amounts */}
              <div className='flex gap-2 mt-5'>
              <button className='bg-slate-800 p-3 rounded-lg'>Pay $10</button>
              <button className='bg-slate-800 p-3 rounded-lg'>Pay $20</button>
              <button className='bg-slate-800 p-3 rounded-lg'>Pay $30</button>
              </div>
        </div>
      </div>
    </>
  );
};

export default Username;
