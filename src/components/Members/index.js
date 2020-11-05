import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import { convertDate } from '../utilis';
import { getFullName } from '../helpers';
import MemberProgress from '../MemberProgress';
import MemberTasks from '../MemberTasks';

const Members = ({ members, handleMember }) => {
  return (
    <section className='members'>
      <table className='table-members'>
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Direction</th>
            <th>Education</th>
            <th>Start</th>
            <th>Age</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, i) => {
            return (
              <tr key={member.id}>
                <td>{++i}</td>
                <td>{getFullName(member.firstName, member.lastName)}</td>
                <td>{member.direction}</td>
                <td>{member.education}</td>
                <td>{convertDate(member.startDate)} </td>
                <td>{member.age}</td>
                <td>
                  <div className='buttons'>
                    <Button
                      buttonClass='btn'
                      buttonName='Progress'
                      handleClick={handleMember(member, MemberProgress)}
                    />
                    <Button buttonClass='btn' buttonName='Tasks' handleClick={handleMember(member, MemberTasks)} />
                  </div>
                  <div className='buttons'>
                    <Button buttonClass='btn' buttonName='Edit' />
                    <Button buttonClass='btn-warning' buttonName='Delete' />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

Members.propTypes = {
  members: PropTypes.array,
  handleMember: PropTypes.func,
};

export default Members;
