import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../Button';
import Spinner from '../Spinner';
import { db } from '../../firebase';
import { convertDate } from '../utilis';
import TrackPage from '../TrackPage';

class TaskTrackManage extends React.PureComponent {
  state = {
    isLoading: true,
    task: {},
  };
  async componentDidMount() {
    const taskId = this.props.match.params.taskId;
    const task = await db.getTaskById(taskId);
    this.setState({ task, isLoading: false });
  }
  componentWillUnmount() {
    this.props.setIsLoading();
  }
  render() {
    const { tracks } = this.props;
    return true ? (
      <div>
        <div className='task-message'> This is your task tracks:</div>
        <Button
          buttonName='Add track'
          buttonClass='btn btn-add-track'
          handleClick={this.props.handlePage(TrackPage, 'create', this.state.task)}
        />
        <Link to={`/members/${this.props.match.params.id}/tasks`}>
          <Button buttonName='To Tasks' buttonClass='btn btn-back' />
        </Link>
        <table className='table-members'>
          <thead>
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Note</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((item, i) => {
              return (
                <tr key={item.id}>
                  <td>{++i}</td>
                  <td>{item.task}</td>
                  <td className='row-note' onClick={this.props.handlePage(TrackPage, 'detail', item)}>
                    {item.note}
                  </td>
                  <td>{convertDate(item.date)}</td>
                  <td>
                    <div className='buttons'>
                      <Button
                        buttonClass='btn'
                        buttonName='Edit'
                        handleClick={this.props.handlePage(TrackPage, 'edit', item)}
                      />
                      <Button
                        buttonClass='btn-warning'
                        buttonName='Delete'
                        handleClick={() => this.props.deleteTrack(item.id, 'progress')}
                      />
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

export default TaskTrackManage;
