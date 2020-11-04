import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ buttonName, buttonClass, handleClick }) => {
  return (
    <button className={buttonClass} onClick={handleClick}>
      {buttonName}
    </button>
  );
};
Button.propTypes = {
  buttonName: PropTypes.string,
  buttonClass: PropTypes.string,
  handleClick: PropTypes.func,
};

export default Button;
