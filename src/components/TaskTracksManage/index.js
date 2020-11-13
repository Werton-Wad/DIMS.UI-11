import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../Button';
import Spinner from '../Spinner';
import { db } from '../../firebase';
import { convertDate } from '../utilis';
import TrackPage from '../TrackPage';

class TaskTrackManage extends React.Component {
  state = {
    tracks: [],
    isLoading: true,
  };
  async componentDidMount() {
    const taskId = this.props.match.params.taskId;
    const tracks = await db.getTaskTracks(taskId);
    this.setState({ tracks, isLoading: false });
  }
  render() {
    return !this.state.isLoading ? (
      <div>
        <div className='task-message'> This is your task tracks:</div>
        <Button
          buttonName='Add track'
          buttonClass='btn btn-add-track'
          handleClick={this.props.handleTrackPage(TrackPage, 'create')}
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
            {this.state.tracks.map((item, i) => {
              return (
                <tr key={item.noteId}>
                  <td>{++i}</td>
                  <td>{item.task}</td>
                  <td className='row-note' onClick={this.props.handleTrackPage(TrackPage, 'detail', item)}>
                    {item.note}
                  </td>
                  <td>{convertDate(item.date)}</td>
                  <td>
                    <div className='buttons'>
                      <Button
                        buttonClass='btn'
                        buttonName='Edit'
                        handleClick={this.props.handleTrackPage(TrackPage, 'edit', item)}
                      />
                      <Button buttonClass='btn-warning' buttonName='Delete' />
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
