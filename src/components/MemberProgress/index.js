import React from 'react';
import PropTypes from 'prop-types';

import { getFullName } from '../helpers';
import { convertDate } from '../utilis';

const MemberProgress = ({ member }) => {
  let id = 1;
  return (
    <div>
      <div className='task-message'>{getFullName(member.firstName, member.lastName)} progress:</div>
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

MemberProgress.propTypes = {
  member: PropTypes.exact({
    tasks: PropTypes.array,
    id: PropTypes.string,
    age: PropTypes.number,
    direction: PropTypes.string,
    education: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    startDate: PropTypes.number,
    progress: PropTypes.array,
  }),
};

export default MemberProgress;
