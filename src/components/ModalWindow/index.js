import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

const ModalWindow = ({ toggleModal, children }) => {
  return (
    <>
      <div className='modal-window-overlay'></div>
      <div className='modal-window'>
        <div className='modal-window__wrapper'>
          <div>{children}</div>
          <Button toggleModal={toggleModal} />
        </div>
      </div>
    </>
  );
};

ModalWindow.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default ModalWindow;
