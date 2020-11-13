import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';

const Header = () => {
  return (
    <header>
      <h1 className='header__title'>Management system</h1>
      <Link to='/tasks'>
        <Button buttonName='Tasks manage' buttonClass='btn' />
      </Link>
    </header>
  );
};

export default Header;
