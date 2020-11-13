import React from 'react';
import PropTypes from 'prop-types';

import svg from './close-icon.svg';
const Button = ({ toggleModal }) => {
  return (
    <div onClick={toggleModal}>
      <img className='close-btn' src={svg} alt='close-button' />
    </div>
  );
};

Button.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default Button;
