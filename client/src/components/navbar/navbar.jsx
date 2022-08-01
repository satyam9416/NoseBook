import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { IoMdSettings } from 'react-icons/io'
import { FaUser } from 'react-icons/fa'
import { RiMessage3Fill } from 'react-icons/ri'
import {NavLink} from 'react-router-dom'
import './navbar.css'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const {_id} = useSelector((state) => state.authReducer.authData)
  return (
    <div className='navbar'>
      <NavLink to='/home'><AiFillHome className='nav-btn btn' /></NavLink>
      <NavLink to={`/profile/${_id}`}><FaUser className='nav-btn btn' /></NavLink>
      <NavLink to={`/Chat/${_id}`}><RiMessage3Fill className='nav-btn btn' /></NavLink>
      <NavLink to='/'><IoMdSettings className='nav-btn btn' /></NavLink>
    </div>
  )
}

export default Navbar