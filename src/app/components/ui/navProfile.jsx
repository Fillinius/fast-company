import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUserData } from '../../store/users';

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUserData())
  const [isOpen, setOpen] = useState(false)
  const toggleMenu = () => {
    setOpen((prev) => !prev)
  }
  if (!currentUser) return 'Loading...'
  return (
    <div
      className="dropdown"
      onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-item-center">
        <div className="me-2">{currentUser.name}</div>
        <img src={currentUser.image}
          alt="Какая-то картинка"
          height="40"
          className="img-responsive rounded-circle" />
      </div>
      <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
        <Link
          to={`/users/${currentUser._id}`} className='dropdown-item'>Profile</Link>
        <Link
          to='/logOut'
          className='dropdown-item'>Log Out</Link>
      </div>
    </div>
  );
}

export default NavProfile;