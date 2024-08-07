'use client';
import React from 'react'
import { Logout } from './Logout';

const Navbar = ({ setSearch }) => {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className='flex justify-between items-center pt-3 pb-3 bg-black'>
      <div className='ml-5 text-white cursor-pointer'>
        LOGO
      </div>
      <input 
        type="search" 
        placeholder="Search" 
        className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-white"
        onChange={(e) => handleSearch(e)}
      />
      <div className='mr-5'>
        <Logout />
      </div>
    </div>
  )
}

export default Navbar
