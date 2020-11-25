import React from 'react';
import faker from 'faker';
import PropTypes from 'prop-types';

import Button from '../Button';
import { getFullName } from '../helpers';
import { convertDate, getTimestampFromString } from '../utilis';
import { db } from '../../firebase';
import helperTaskPage from './helperTaskPage';

class TaskPage extends React.PureComponent {
  state = {
    isLoading: true,
    members: [],
    id: '',
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
        let gettedTask = this.props.pagePayload;
        if (typeof gettedTask === 'string') {
          const taskId = this.props.pagePayload;
          gettedTask = await db.getTaskById(taskId);
        }
        const { description, startDate, deadlineDate, id, userId, name } = gettedTask;
        this.setState(() => {
          return {
            id,
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
    // try {
    //   e.preventDefault();
    //   const { name, description, start, deadline, selected } = this.state;
    //   const newTask = {
    //     id: faker.random.uuid(),
    //     userId: selected,
    //     name,
    //     description,
    //     startDate: getTimestampFromString(start),
    //     deadlineDate: getTimestampFromString(deadline),
    //   }
    //   await db.addMemberToCollection(newTask, 'tasks');
    //   this.props.toggleModal();
    // } catch (e) {}
    e.preventDefault();
    const { name, description, start, deadline, id, selected } = this.state;
    const { typeForm } = this.props;
    let obj = {};
    if (this.props.typeForm === 'create') {
      obj = {
        name,
        description,
        startDate: getTimestampFromString(start),
        deadlineDate: getTimestampFromString(deadline),
        status: 'Active',
        userId: selected,
        id: faker.random.uuid(),
      };
    } else if (this.props.typeForm === 'edit') {
      obj = {
        id,
        name,
        description,
        startDate: getTimestampFromString(start),
        deadlineDate: getTimestampFromString(deadline),
        userId: selected,
      };
    }
    this.props.createTask(obj, typeForm);
    this.props.toggleModal();
  };

  render() {
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
  pagePayload: PropTypes.object.isRequired,
};
export default TaskPage;
