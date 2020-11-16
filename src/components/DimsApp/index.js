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
import PrivateRoute from '../PrivateRoute';
import MemberProgress from '../MemberProgress';
import TrackPage from '../TrackPage';
import TasksManage from '../TasksManage';
import TaskTracksManage from '../TaskTracksManage';
import { AuthProvider, AuthContext } from '../Auth/AuthProvider';
class DimsApp extends React.PureComponent {
  state = {
    members: [],
    currentMember: {},
    isModal: false,
    component: '',
    typeForm: '',
    currentTask: {},
    currentTrack: {},
    isLoading: false,
  };
  async componentDidMount() {
    try {
      const members = await db.getMembers();
      this.setState({ members });
    } catch (e) {
      throw e;
    }
  }
  handleMember = (member) => () => {
    this.setState({ currentMember: member });
  };
  handleTaskPage = (component, typeForm, task) => () => {
    this.setState((prevState) => {
      return {
        component,
        currentTask: task,
        typeForm,
        isModal: !prevState.isModal,
      };
    });
  };
  handleTrackPage = (component, typeForm, track) => () => {
    this.setState((prevState) => {
      return {
        component,
        typeForm,
        currentTrack: track,
        isModal: !prevState.isModal,
      };
    });
  };
  handleRegisterPage = (component, typeForm, member) => () => {
    this.setState((prevState) => {
      return {
        component,
        typeForm,
        currentMember: member,
        isModal: !prevState.isModal,
      };
    });
  };
  toggleModal = () => {
    this.setState({ isModal: !this.state.isModal });
  };

  render() {
    const { isModal, members, currentMember, component, typeForm, currentTask, currentTrack } = this.state;
    return (
      <div>
        <AuthProvider>
          <PrivateRoute component={Header} />
          {isModal && (
            <ModalWindow
              toggleModal={this.toggleModal}
              member={currentMember}
              Component={component}
              typeForm={typeForm}
              task={currentTask}
              track={currentTrack}
            />
          )}
          {members.length ? (
            <div className='container'>
              <Switch>
                <Route path='/login' component={Login} />
                <PrivateRoute
                  path='/members'
                  exact
                  component={Members}
                  members={members}
                  handleMember={this.handleMember}
                  handleRegisterPage={this.handleRegisterPage}
                />
                <Route
                  path='/members/:id/progress'
                  exact
                  render={(props) => <MemberProgress {...props} handleTaskPage={this.handleTaskPage} />}
                />
                <Route path='/members/:id/tasks' exact render={(props) => <MemberTasks {...props} />} />
                <Route
                  path='/members/:id/tasks/:taskId/tracks'
                  exact
                  render={(props) => <TaskTracksManage {...props} handleTrackPage={this.handleTrackPage} />}
                />
                <Route path='/tasks' render={() => <TasksManage handleTaskPage={this.handleTaskPage} />} />
              </Switch>
            </div>
          ) : (
            <Spinner />
          )}
        </AuthProvider>
      </div>
    );
  }
}

export default DimsApp;
