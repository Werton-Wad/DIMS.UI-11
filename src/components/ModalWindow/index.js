import React from 'react';

import Button from './Button';
import MemberTasks from '../MemberTasks';
import MemberProgress from '../MemberProgress';
import './modal.css';

const ModalWindow = (props) => {
  let { toggleModal, tasks, component: Component } = props;
  console.log(tasks);
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
