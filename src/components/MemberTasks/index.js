import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../Button';
import Spinner from '../Spinner';
import { db } from '../../firebase';
import { convertDate } from '../utilis';
class MemberTasks extends React.Component {
  state = {
    member: {},
    isLoading: true,
    firstName: '',
    tasks: [],
  };
  async componentDidMount() {
    const memberId = this.props.match.params.id;
    const member = await db.getMember(memberId);
    const tasks = await db.getMemberTasks(memberId);
    this.setState({ firstName: member.firstName, lastName: member.lastName, tasks, isLoading: false, member });
  }
  render() {
    const { firstName, tasks, isLoading, member } = this.state;
    return !isLoading ? (
      <div>
        <div className='task-message'>Hi, dear {firstName}! This is your current tasks:</div>
        <Link to='/members'>
          <Button buttonName='Back' buttonClass='btn btn-back' />
        </Link>
        <table className='table-members'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Start</th>
              <th>Deadline</th>
              <th>Status</th>
              <th></th>
              <th>(Available only for admin)</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, i) => {
              return (
                <tr key={task.id}>
                  <td>{++i}</td>
                  <td>{task.name}</td>
                  <td>{convertDate(task.startDate)}</td>
                  <td>{convertDate(task.deadlineDate)}</td>
                  <td>{task.status}</td>
                  <td>
                    <Link to={`/members/${member.id}/tasks/${task.id}/tracks`}>
                      <Button buttonClass='btn' buttonName='Track' />
                    </Link>
                  </td>
                  <td>
                    <div className='buttons'>
                      <Button buttonClass='btn-success' buttonName='Success' />
                      <Button buttonClass='btn-fail' buttonName='Fail' />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    ) : (
      <Spinner />
    );
  }
}

export default MemberTasks;
