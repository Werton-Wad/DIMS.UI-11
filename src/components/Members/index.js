import React from 'react';

import './members.css';
import Button from '../Button';
import { convertDate } from '../utilis';

const Members = (props) => {
  const { members, handleMemberTasks, handleMemberProgress } = props;
  let id = 1;
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
          {members.map((member) => {
            return (
              <tr key={id}>
                <td>{id++}</td>
                <td>{member.firstName + ' ' + member.lastName}</td>
                <td>{member.direction}</td>
                <td>{member.education}</td>
                <td>{convertDate(member.startDate)} </td>
                <td>{member.age}</td>
                <td>
                  <div className='buttons'>
                    <Button buttonClass='btn' buttonName='Progress' handleClick={() => handleMemberProgress(member)} />
                    <Button buttonClass='btn' buttonName='Tasks' handleClick={() => handleMemberTasks(member)} />
                  </div>
                  <div className='buttons'>
                    <Button buttonClass='btn' buttonName='Edit' />
                    <Button buttonClass='btn btn-warning' buttonName='Delete' />
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

export default Members;
