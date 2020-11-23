import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import { db } from '../../firebase';
import Members from '../Members';
import MemberTasks from '../MemberTasks';
import Header from '../Header';
import Button from '../Button';
import Spinner from '../Spinner';
import ModalWindow from '../ModalWindow';
import Login from '../Login';
import auth from '../Auth/auth';
import PrivateRoute from '../PrivateRoute';
import MemberProgress from '../MemberProgress';
import TrackPage from '../TrackPage';
import TasksManage from '../TasksManage';
import TaskTracksManage from '../TaskTracksManage';

class DimsApp extends React.PureComponent {
  state = {
    members: [],
    isModal: false,
    component: '',
    typeForm: '',
    pagePayload: {},
    isLoading: false,
  };
  async componentDidMount() {
    try {
      await db.initAppFirebase();
      const members = await db.getMembers();
      this.setState({ members });
    } catch (e) {}
  }
  handleMember = (currentMember) => () => {
    this.setState({ currentMember });
  };
  handlePage = (component, typeForm, pagePayload) => () => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          component,
          typeForm,
          pagePayload,
        };
      },
      () => this.toggleModal(),
    );
  };
  toggleModal = () => {
    this.setState({ isModal: !this.state.isModal });
  };

  render() {
    const { isModal, members, component: Component, typeForm, pagePayload } = this.state;
    return (
      <div>
        <Header />
        {isModal && (
          <ModalWindow toggleModal={this.toggleModal}>
            <Component toggleModal={this.toggleModal} typeForm={typeForm} pagePayload={pagePayload} />
          </ModalWindow>
        )}
        {members.length ? (
          <div className='container'>
            <Switch>
              <Route path='/login' component={Login} />
              <Route
                path='/members'
                exact
                render={() => (
                  <Members members={members} handleMember={this.handleMember} handlePage={this.handlePage} />
                )}
              />
              <Route
                path='/members/:id/progress'
                exact
                render={(props) => <MemberProgress {...props} handlePage={this.handlePage} />}
              />
              <Route path='/members/:id/tasks' exact component={MemberTasks} />
              <Route
                path='/members/:id/tasks/:taskId/tracks'
                exact
                render={(props) => <TaskTracksManage {...props} handlePage={this.handlePage} />}
              />
              <Route path='/tasks' render={() => <TasksManage handlePage={this.handlePage} />} />
            </Switch>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default DimsApp;
