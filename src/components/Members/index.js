import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '../Button';
import { convertDate, getAge } from '../utilis';
import { getFullName } from '../helpers';
import RegisterPage from '../RegisterPage';
import { AuthContext } from '../Auth/AuthProvider';

const Members = ({ members, handleMember, handlePage, deleteMember }) => {
  return (
    <AuthContext.Consumer>
      {(context) => (
        <section className='members'>
          <Button
            buttonName='Register'
            buttonClass='btn btn-register'
            handleClick={handlePage(RegisterPage, 'create')}
          />
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
                    <td onClick={handlePage(RegisterPage, 'detail', member)}>
                      {getFullName(member.firstName, member.lastName)}
                    </td>
                    <td>{member.direction}</td>
                    <td>{member.education}</td>
                    <td>{convertDate(member.startDate)} </td>
                    <td>{getAge(member.birthDate)}</td>
                    <td>
                      <div className='buttons'>
                        <Link to={`/members/${member.id}/progress`}>
                          <Button buttonClass='btn' buttonName='Progress' />
                        </Link>
                        <Link to={`/members/${member.id}/tasks`}>
                          <Button buttonClass='btn' buttonName='Tasks' onClick={handleMember(member)} />
                        </Link>
                      </div>
                      <div className='buttons'>
                        <Button
                          buttonClass='btn'
                          buttonName='Edit'
                          handleClick={handlePage(RegisterPage, 'edit', member)}
                        />
                        <Button
                          buttonClass='btn-warning'
                          buttonName='Delete'
                          handleClick={() => deleteMember(member.id, 'members')}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      )}
    </AuthContext.Consumer>
  );
};

Members.propTypes = {
  members: PropTypes.array.isRequired,
  handleMember: PropTypes.func.isRequired,
  handlePage: PropTypes.func.isRequired,
};

export default Members;
