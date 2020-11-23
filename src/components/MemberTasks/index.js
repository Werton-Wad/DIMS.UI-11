import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../Button';
import Spinner from '../Spinner';
import { db } from '../../firebase';
import { convertDate } from '../utilis';
class MemberTasks extends React.PureComponent {
  state = {
    member: {},
    isLoading: true,
    firstName: '',
    tasks: [],
  };
  componentDidMount() {
    const { id: memberId } = this.props.match.params;
    Promise.all([db.getMember(memberId), db.getMemberTasks(memberId)])
      .then(([member, tasks]) => {
        const { firstName, lastName } = member;
        this.setState({ firstName, lastName, tasks, isLoading: false, member });
      })
      .catch((e) => {});
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
              const { id, name, startDate, deadlineDate, status } = task;
              return (
                <tr key={id}>
                  <td>{++i}</td>
                  <td>{name}</td>
                  <td>{convertDate(startDate)}</td>
                  <td>{convertDate(deadlineDate)}</td>
                  <td>{status}</td>
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
