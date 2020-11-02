import React from 'react';

import { createData } from '../utilis';
import { db } from '../../firebase';
import './dims-app.css';
import Members from '../Members';
import Header from '../Header';
import Button from '../Button';
import Spinner from '../Spinner';
import ModalWindow from '../ModalWindow';
import MemberTasks from '../MemberTasks';
import MemberProgress from '../MemberProgress';

class DimsApp extends React.Component {
  state = {
    members: [],
    currentMember: {},
    isModal: false,
    component: '',
  };
  async componentDidMount() {
    const membersDB = await db.getMembers();
    if (membersDB.length) {
      this.setState({ members: membersDB });
    } else {
      const members = createData(10);
      Promise.all(members.map((member) => db.addMemberToDb(member)));
      this.setState({ members });
    }
  }
  handleMemberTasks = (member) => {
    this.setState({ component: MemberTasks, currentMember: member, isModal: !this.state.isModal });
  };
  handleMemberProgress = (member) => {
    this.setState({ currentMember: member, component: MemberProgress, isModal: !this.state.isModal });
  };
  toggleModal = () => {
    this.setState({ isModal: !this.state.isModal });
  };
  render() {
    const { isModal, members } = this.state;
    return (
      <div>
        {isModal && <ModalWindow toggleModal={this.toggleModal} {...this.state} />}
        <Header />
        {members.length ? (
          <div className='container'>
            <Button buttonName='Register' buttonClass='btn' />
            <Members
              members={members}
              handleMemberTasks={this.handleMemberTasks}
              handleMemberProgress={this.handleMemberProgress}
            />
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default DimsApp;
