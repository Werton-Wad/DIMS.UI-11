import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

const ModalWindow = (props) => {
  console.log(props);
  const { Component, ...rest } = props;
  return (
    <>
      <div className='modal-window-overlay'></div>
      <div className='modal-window'>
        <div className='modal-window__wrapper'>
          <Component {...rest} />
          <Button toggleModal={props.toggleModal} />
        </div>
      </div>
    </>
  );
};

ModalWindow.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  Component: PropTypes.elementType.isRequired,
  member: PropTypes.object,
  typeForm: PropTypes.string.isRequired,
  task: PropTypes.object,
  track: PropTypes.object,
};

export default ModalWindow;
