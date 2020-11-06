import React from 'react';
import PropTypes from 'prop-types';

import { getFullName } from '../helpers';
import { convertDate } from '../utilis';

const MemberProgress = ({ member }) => {
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
          {member.progress.map((item, i) => {
            return (
              <tr key={item.id}>
                <td>{++i}</td>
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
    id: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    direction: PropTypes.string.isRequired,
    education: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    startDate: PropTypes.number.isRequired,
    progress: PropTypes.array.isRequired,
  }),
};

export default MemberProgress;
