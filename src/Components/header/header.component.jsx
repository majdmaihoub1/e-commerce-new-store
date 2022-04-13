import React from 'react';
import { Link } from 'react-router-dom';
import './header.style.scss';
import { auth } from '../../firebase/firebase.utils';
import { ReactComponent as Logo } from '../../assets/crown.svg';
const Header = ({ currentUser }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        Shop
      </Link>
      <Link className='option' to='/shop'>
        Contact
      </Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          <a href='#'>Sign Out</a>
        </div>
      ) : (
        <Link className='option' to='/signin'>
          Sign In
        </Link>
      )}

      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          Hi {currentUser.displayName} !
        </div>
      ) : (
        ''
      )}
    </div>
  </div>
);

export default Header;
