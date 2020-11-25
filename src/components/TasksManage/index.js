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
  // async componentDidMount() {
  //   const tasks = await db.getAllTasks();
  //   this.setState({ tasks, isLoading: false });
  // }
  // deleteTask = async (taskId, collection) => {
  //   try {
  //     const tasks = this.state.tasks.filter((task) => task.id !== taskId);
  //     this.setState({ tasks });
  //     await db.deleteMemberFromCollection(taskId, collection);
  //   } catch (e) {}
  // }
  render() {
    const { isLoading } = this.state;
    const { handlePage, deleteTask, tasks } = this.props;
    return isLoading ? (
      <section className='members'>
        <Button buttonName='Create' buttonClass='btn btn-create' handleClick={handlePage(TaskPage, 'create')} />
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
              const { id, startDate, deadlineDate } = task;
              return (
                <tr key={id}>
                  <td>{++i}</td>
                  <td onClick={handlePage(TaskPage, 'detail', task)}>{task.name}</td>
                  <td>{convertDate(startDate)} </td>
                  <td>{convertDate(deadlineDate)} </td>
                  <td>
                    <div className='buttons'>
                      <Button buttonClass='btn' buttonName='Edit' handleClick={handlePage(TaskPage, 'edit', task)} />
                      <Button
                        buttonClass='btn-warning'
                        buttonName='Delete'
                        handleClick={() => deleteTask(id, 'tasks')}
                      />
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
