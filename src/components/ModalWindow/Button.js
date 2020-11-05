import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ toggleModal }) => {
  return (
    <div onClick={toggleModal}>
      <img className='close-btn' src='./assets/close-icon.svg' alt='close-button' />
    </div>
  );
};

Button.propTypes = {
  toggleModal: PropTypes.func,
};

export default Button;
