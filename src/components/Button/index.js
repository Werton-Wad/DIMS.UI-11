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
  buttonName: PropTypes.string.isRequired,
  buttonClass: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Button;
