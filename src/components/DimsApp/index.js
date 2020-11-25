import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import { db } from '../../firebase';
import Members from '../Members';
import MemberTasks from '../MemberTasks';
import Header from '../Header';
import Footer from '../Footer';
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
    tasks: [],
    members: [],
    memberTracks: [],
    isModal: false,
    component: '',
    typeForm: '',
    pagePayload: {},
    isLoading: true,
  };
  async componentDidMount() {
    try {
      const members = await db.getMembers();
      const tasks = await db.getAllTasks();
      this.setState({ members, tasks });
    } catch (e) {
      throw e;
    }
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
  handleTrack = async (id) => {
    const memberTracks = await db.getTaskTracks(id);
    this.setState({ memberTracks, isLoading: false });
  };
  registerMember = (payload, type) => {
    if (type === 'create') {
      db.addMemberToCollection(payload, 'members').then(() => {
        const members = [...this.state.members, payload];
        this.setState({ members });
      });
    } else if (type === 'edit') {
      db.updateMember(payload.id, 'members', payload).then(() => {
        const members = this.state.members.map((member) => {
          return member.id === payload.id ? payload : member;
        });
        this.setState({ members });
      });
    }
  };
  createTask = async (payload, type) => {
    if (type === 'create') {
      await db.addMemberToCollection(payload, 'tasks');
      const tasks = [...this.state.tasks, payload];
      this.setState({ tasks });
    } else if (type === 'edit') {
      await db.updateMember(payload.id, 'tasks', payload);
      const tasks = this.state.tasks.map((task) => {
        return task.id === payload.id ? payload : task;
      });
      this.setState({ tasks });
    }
  };
  createTrack = async (payload, type) => {
    if (type === 'create') {
      console.log(payload);
      await db.addMemberToCollection(payload, 'progress');
      const memberTracks = [...this.state.memberTracks, payload];
      this.setState({ memberTracks });
    } else if (type === 'edit') {
      await db.updateMember(payload.id, 'progress', payload);
      const memberTracks = this.state.memberTracks.map((track) => {
        return track.id === payload.id ? payload : track;
      });
      this.setState({ memberTracks });
    }
  };
  toggleModal = () => {
    this.setState({ isModal: !this.state.isModal });
  };
  deleteMember = async (memberId, collection) => {
    try {
      const members = this.state.members.filter((member) => member.id !== memberId);
      this.setState({ members });
      await db.deleteMemberFromCollection(memberId, collection);
    } catch (e) {}
  };
  deleteTask = async (taskId, collection) => {
    try {
      const tasks = this.state.tasks.filter((task) => task.id !== taskId);
      this.setState({ tasks });
      await db.deleteMemberFromCollection(taskId, collection);
    } catch (e) {}
  };
  deleteTrack = async (noteId, collection) => {
    try {
      const memberTracks = this.state.memberTracks.filter((track) => track.id !== noteId);
      this.setState({ memberTracks });
      await db.deleteMemberFromCollection(noteId, collection);
    } catch (e) {}
  };
  setIsLoading = () => {
    this.setState({ isLoading: !this.state.isLoading });
  };
  render() {
    const {
      isModal,
      members,
      tasks,
      component: Component,
      typeForm,
      pagePayload,
      memberTracks,
      isLoading,
    } = this.state;
    console.log(isLoading);
    return (
      <div className='wrapper'>
        <AuthProvider>
          <PrivateRoute component={Header} />
          {isModal && (
            <ModalWindow toggleModal={this.toggleModal}>
              <Component
                toggleModal={this.toggleModal}
                typeForm={typeForm}
                pagePayload={pagePayload}
                registerMember={this.registerMember}
                createTask={this.createTask}
                createTrack={this.createTrack}
              />
            </ModalWindow>
          )}
          {members.length ? (
            <>
              <div className='container'>
                <Switch>
                  <Route path='/login' component={Login} />
                  <PrivateRoute
                    path='/members'
                    exact
                    component={Members}
                    members={members}
                    handleMember={this.handleMember}
                    handlePage={this.handlePage}
                    deleteMember={this.deleteMember}
                  />
                  <Route
                    path='/members/:id/progress'
                    exact
                    render={(props) => <MemberProgress {...props} handlePage={this.handlePage} />}
                  />
                  <Route
                    path='/members/:id/tasks'
                    exact
                    render={(props) => <MemberTasks {...props} handleTrack={this.handleTrack} />}
                  />
                  <Route
                    path='/members/:id/tasks/:taskId/tracks'
                    exact
                    render={(props) =>
                      !isLoading ? (
                        <TaskTracksManage
                          {...props}
                          handlePage={this.handlePage}
                          tracks={memberTracks}
                          deleteTrack={this.deleteTrack}
                          setIsLoading={this.setIsLoading}
                        />
                      ) : (
                        <Spinner />
                      )
                    }
                  />
                  <Route
                    path='/tasks'
                    render={() => (
                      <TasksManage handlePage={this.handlePage} deleteTask={this.deleteTask} tasks={tasks} />
                    )}
                  />
                </Switch>
              </div>
              <PrivateRoute component={Footer} />
            </>
          ) : (
            <Spinner />
          )}
        </AuthProvider>
      </div>
    );
  }
}

export default DimsApp;
