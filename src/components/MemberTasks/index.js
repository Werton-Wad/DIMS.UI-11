import React from 'react';

import Button from '../Button';
import { convertDate } from '../utilis';
const MemberTasks = ({ currentMember: member }) => {
  let id = 1;
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
          {member.tasks.map((task) => {
            return (
              <tr key={id}>
                <td>{id++}</td>
                <td>{task.name}</td>
                <td>{convertDate(task.startDate)}</td>
                <td>{convertDate(task.dedlineDate)}</td>
                <td>{task.status}</td>
                <td>
                  <Button buttonClass='btn' buttonName='Track' />
                </td>
                <td>
                  <div className='buttons'>
                    <Button buttonClass='btn btn-success' buttonName='Success' />
                    <Button buttonClass='btn btn-fail' buttonName='Fail' />
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

export default MemberTasks;
