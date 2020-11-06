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
  toggleModal: PropTypes.func.isRequired,
  Component: PropTypes.elementType.isRequired,
  member: PropTypes.exact({
    tasks: PropTypes.array,
    id: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    direction: PropTypes.string.isRequired,
    education: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    startDate: PropTypes.number.isRequired,
    progress: PropTypes.array,
  }),
};

export default ModalWindow;
