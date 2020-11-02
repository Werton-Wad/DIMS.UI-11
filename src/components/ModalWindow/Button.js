import React from 'react';

const Button = (props) => {
  return (
    <div onClick={props.toggleModal}>
      <img className='close-btn' src='./assets/close-icon.svg' />
    </div>
  );
};

export default Button;
