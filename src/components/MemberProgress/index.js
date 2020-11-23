import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getFullName } from '../helpers';
import { convertDate } from '../utilis';
import Button from '../Button';
import { db } from '../../firebase';
import Spinner from '../Spinner';
import TaskPage from '../TaskPage';

class MemberProgress extends React.PureComponent {
  state = {
    progress: [],
    isLoading: true,
    firstName: '',
    lastName: '',
  };
  componentDidMount() {
    const { id: memberId } = this.props.match.params;
    Promise.all([db.getMemberProgress(memberId), db.getMember(memberId)])
      .then(([progress, member]) => {
        const { firstName, lastName } = member;
        this.setState({ firstName, lastName, progress, isLoading: false });
      })
      .catch((e) => {});
  }
  render() {
    const { isLoading, firstName, lastName, progress } = this.state;
    const { handlePage } = this.props;
    return !isLoading ? (
      <div>
        <div className='task-message'>{getFullName(firstName, lastName)} progress:</div>
        <Link to='/members'>
          <Button buttonName='Back' buttonClass='btn btn-back' />
        </Link>
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
            {progress.map((item, i) => {
              return (
                <tr key={item.taskId}>
                  <td>{++i}</td>
                  <td onClick={handlePage(TaskPage, 'detail', item.taskId)}>{item.task}</td>
                  <td>{item.note}</td>
                  <td>{convertDate(item.date)}</td>
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

MemberProgress.propTypes = {
  handlePage: PropTypes.func.isRequired,
};

export default MemberProgress;
