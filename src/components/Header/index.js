import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import Logout from '../Logout';

const Header = () => {
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__content'>
          <h1 className='header__title'>Management system</h1>
          <Link to='/tasks'>
            <Button buttonName='Tasks manage' buttonClass='btn' />
          </Link>
          <Logout />
        </div>
      </div>
    </header>
  );
};

export default Header;
