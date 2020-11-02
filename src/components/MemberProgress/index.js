import React from 'react';

import { convertDate } from '../utilis';
const MemberProgress = ({ currentMember: member }) => {
  let id = 1;
  return (
    <div>
      <div className='task-message'>{member.firstName + ' ' + member.lastName} progress:</div>
      <table className='table-members'>
        <thead>
          <tr>
            <th>#</th>
            <th>Task</th>
            <th>Note</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {member.progress.map((item) => {
            return (
              <tr key={id}>
                <td>{id++}</td>
                <td>{item.task}</td>
                <td>{item.note}</td>
                <td>{convertDate(item.date)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default MemberProgress;
