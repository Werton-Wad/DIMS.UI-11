import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

const ModalWindow = ({ toggleModal, Component, member }) => {
  return (
    <>
      <div className='modal-window-overlay'></div>
      <div className='modal-window'>
        <div className='modal-window__wrapper'>
          <Component member={member} />
          <Button toggleModal={toggleModal} />
        </div>
      </div>
    </>
  );
};

ModalWindow.propTypes = {
  toggleModal: PropTypes.func,
  Component: PropTypes.elementType,
  member: PropTypes.exact({
    tasks: PropTypes.array,
    id: PropTypes.string,
    age: PropTypes.number,
    direction: PropTypes.string,
    education: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    startDate: PropTypes.number,
    progress: PropTypes.array,
  }),
};

export default ModalWindow;
