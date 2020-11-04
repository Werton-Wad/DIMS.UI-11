import React from 'react';

import Button from './Button';
const ModalWindow = (props) => {
  const { toggleModal, tasks, component: Component } = props;
  return (
    <>
      <div className='modal-window-overlay'></div>
      <div className='modal-window'>
        <div className='modal-window__wrapper'>
          <Component {...props} />
          <Button toggleModal={toggleModal} />
        </div>
      </div>
    </>
  );
};

export default ModalWindow;
