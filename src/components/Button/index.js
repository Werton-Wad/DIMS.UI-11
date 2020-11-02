import React from 'react';

import './button.css';

const Button = (props) => {
  const { buttonName, buttonClass, handleClick } = props;
  return (
    <button className={buttonClass} onClick={handleClick}>
      {buttonName}
    </button>
  );
};
export default Button;
