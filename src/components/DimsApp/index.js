import React from 'react';

import { db } from '../../firebase';
import Members from '../Members';
import Header from '../Header';
import Button from '../Button';
import Spinner from '../Spinner';
import ModalWindow from '../ModalWindow';

class DimsApp extends React.PureComponent {
  state = {
    members: [],
    currentMember: {},
    isModal: false,
    component: '',
  };
  async componentDidMount() {
    try {
      const members = await db.getMembers();
      this.setState({ members });
    } catch (e) {
      throw e;
    }
  }
  handleMember = (member, component) => () => {
    this.setState((prevState) => {
      return {
        component,
        currentMember: member,
        isModal: !prevState.isModal,
      };
    });
  };
  toggleModal = () => {
    this.setState({ isModal: !this.state.isModal });
  };
  render() {
    const { isModal, members, currentMember, component } = this.state;
    return (
      <div>
        {isModal && <ModalWindow toggleModal={this.toggleModal} member={currentMember} Component={component} />}
        <Header />
        {members.length ? (
          <div className='container'>
            <Button buttonName='Register' buttonClass='btn' />
            <Members members={members} handleMember={this.handleMember} />
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default DimsApp;
