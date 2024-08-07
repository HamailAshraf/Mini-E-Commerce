'use client';
import React, { useState } from 'react'
import { Logout } from './Logout';
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import '../styles/Navbar.css';

const NavbarAdmin = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const router = useRouter();
  const moveOn = () => {
    router.push('/dashboard');
  }
  const moveOnHome = () => {
    router.push('/welcomeadmin');
  }

  return (
    <div className='bg-black border-gray-200 dark:bg-gray-900 w-full'>
  <div className='flex items-center justify-between p-4 max-w-screen-xl mx-auto'>
    <div className='flex items-center'>
      {!toggleMenu && (
        <RiMenu3Line
          color='#fff'
          size={27}
          onClick={() => setToggleMenu(true)}
          className='cursor-pointer'
        />
      )}
      <h1 className='text-white ml-4 logo cursor-pointer' onClick={() => router.push('/welcomeadmin')}>Logo</h1>
    </div>
    <div className='flex items-center'>
      <Logout />
    </div>
  </div>
  <div className={`navbar-menu-container ${toggleMenu ? 'active' : ''}`}>
    <div className='navbar-menu_container'>
      <RiCloseLine
        color='#000'
        size={24}
        onClick={() => setToggleMenu(false)}
        className='close-btn'
      />
      <div className='navbar-menu_container-links-sign'>
        <p className='text-white' onClick={() => moveOn()}>Dashboard</p>
        <p className='text-white' onClick={() => moveOnHome()} type='button'>Home</p>
      </div>
    </div>
  </div>
</div>
  )
}

export default NavbarAdmin

// <div className='flex justify-between items-center pt-3 pb-3 bg-black'>
//   <div className='ml-5 text-white cursor-pointer'>
//     LOGO
//   </div>
//   <div className='mr-5'>
//     <Logout />
//   </div>
// </div>