import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import { convertDate } from '../utilis';
const MemberTasks = ({ member }) => {
  return (
    <div>
      <div className='task-message'>Hi, dear {member.firstName}! This is your current tasks:</div>
      <table className='table-members'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Start</th>
            <th>Dedline</th>
            <th>Status</th>
            <th></th>
            <th>(Available only for admin)</th>
          </tr>
        </thead>
        <tbody>
          {member.tasks.map((task, i) => {
            return (
              <tr key={task.id}>
                <td>{++i}</td>
                <td>{task.name}</td>
                <td>{convertDate(task.startDate)}</td>
                <td>{convertDate(task.dedlineDate)}</td>
                <td>{task.status}</td>
                <td>
                  <Button buttonClass='btn' buttonName='Track' />
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
  );
};

MemberTasks.propTypes = {
  member: PropTypes.exact({
    tasks: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    direction: PropTypes.string.isRequired,
    education: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    startDate: PropTypes.number.isRequired,
    progress: PropTypes.array,
  }),
};

export default MemberTasks;
