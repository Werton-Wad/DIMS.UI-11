import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import { getFullName } from '../helpers';
import { convertDate } from '../utilis';
import { db } from '../../firebase';
import helperTaskPage from './helperTaskPage';

class TaskPage extends React.Component {
  state = {
    isLoading: true,
    members: [],
    name: '',
    description: '',
    start: '',
    deadline: '',
    selected: '',
  };

  async componentDidMount() {
    try {
      const members = await db.getMembers();
      if (this.props.typeForm !== 'create') {
        let gettedTask = this.props.task;
        if (typeof gettedTask === 'string') {
          const taskId = this.props.task;
          gettedTask = await db.getTaskById(taskId);
        }
        const { description, startDate, deadlineDate, id, userId, name } = gettedTask;
        this.setState(() => {
          return {
            members,
            name,
            description,
            start: convertDate(startDate, true),
            deadline: convertDate(deadlineDate, true),
            selected: userId,
            isLoading: false,
          };
        });
      } else {
        this.setState({ members, isLoading: false });
      }
    } catch (e) {
      throw e;
    }
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    /* logic */
    this.props.toggleModal();
  };

  render() {
    console.log(this.props);
    const { isLoading, members, name, start, description, deadline, selected } = this.state;
    const { typeForm, toggleModal } = this.props;
    return !isLoading ? (
      <div className='task-page'>
        <div className='task'>
          <h3 className='task-page__title'>{helperTaskPage[typeForm].title(typeForm !== 'create' ? name : null)}</h3>
          <form autoComplete='off'>
            {typeForm === 'create' && (
              <>
                <label for='task-name'>Name</label>
                <input name='name' id='task-name' type='text' onChange={this.handleChange} required />
              </>
            )}
            <label for='task-description'>Description</label>
            <textarea
              name='description'
              id='tak-description'
              rows={typeForm === 'detail' ? 0 : 10}
              onChange={this.handleChange}
              value={description}
              required
              disabled={typeForm === 'detail'}
            ></textarea>
            <label for='task-start-date'>Start</label>
            <input
              name='start'
              id='task-start-date'
              type='date'
              value={start}
              onChange={this.handleChange}
              disabled={typeForm === 'detail'}
              required
            />
            <label for='task-deadline-date'>Deadline</label>
            <input
              name='deadline'
              id='task-deadline-date'
              type='date'
              value={deadline}
              onChange={this.handleChange}
              disabled={typeForm === 'detail'}
              required
            />
            <label for='members-select'>Members</label>
            <select
              name='selected'
              id='members-select'
              multiple
              onChange={this.handleChange}
              disabled={typeForm === 'detail'}
            >
              {members.map((member, i) => {
                return (
                  <option key={member.id} value={member.id} selected={selected === member.id}>
                    {getFullName(member.firstName, member.lastName)}
                  </option>
                );
              })}
            </select>
            {typeForm !== 'detail' && (
              <Button buttonName='Save' buttonClass='btn-form-save' handleClick={this.handleSubmit} />
            )}
            <Button buttonName='Back' buttonClass='btn-form-back' handleClick={toggleModal} />
          </form>
        </div>
      </div>
    ) : null;
  }
}
TaskPage.propTypes = {
  typeForm: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
export default TaskPage;
