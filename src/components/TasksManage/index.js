import React from 'react';
import PropTypes from 'prop-types';

import { convertDate } from '../utilis';
import Button from '../Button';
import { db } from '../../firebase';
import Spinner from '../Spinner';
import TaskPage from '../TaskPage';

class TasksManage extends React.Component {
  state = {
    tasks: [],
    isLoading: true,
  };
  async componentDidMount() {
    const tasks = await db.getAllTasks();
    this.setState({ tasks, isLoading: false });
  }
  render() {
    const { isLoading, tasks } = this.state;
    return !isLoading ? (
      <section>
        <Button
          buttonName='Create'
          buttonClass='btn btn-create'
          handleClick={this.props.handleTaskPage(TaskPage, 'create')}
        />
        <table className='table-members'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Start</th>
              <th>Deadline</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, i) => {
              return (
                <tr key={task.id}>
                  <td>{++i}</td>
                  <td onClick={this.props.handleTaskPage(TaskPage, 'detail', task)}>{task.name}</td>
                  <td>{convertDate(task.startDate)} </td>
                  <td>{convertDate(task.deadlineDate)} </td>
                  <td>
                    <div className='buttons'>
                      <Button
                        buttonClass='btn'
                        buttonName='Edit'
                        handleClick={this.props.handleTaskPage(TaskPage, 'edit', task)}
                      />
                      <Button buttonClass='btn-warning' buttonName='Delete' />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    ) : (
      <Spinner />
    );
  }
}

TasksManage.propTypes = {
  handleTaskPage: PropTypes.func.isRequired,
};

export default TasksManage;
