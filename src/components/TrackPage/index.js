import React from 'react';
import faker from 'faker';
import PropTypes from 'prop-types';

import Button from '../Button';
import { convertDate, getTimestampFromString } from '../utilis';
import helperTrackPage from './helperTrackPage';

class TrackPage extends React.PureComponent {
  state = {
    date: '',
    note: '',
  };
  componentDidMount() {
    if (this.props.typeForm !== 'create') {
      const { note, date } = this.props.pagePayload;
      this.setState(() => {
        return {
          note,
          date: convertDate(date, true),
        };
      });
    }
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { date, note } = this.state;
    const { typeForm } = this.props;
    console.log(this.props.pagePayload);
    let obj = {};
    if (this.props.typeForm === 'create') {
      const { id: taskId, userId, name: task } = this.props.pagePayload;
      obj = {
        task,
        note,
        date: getTimestampFromString(date),
        taskId,
        userId,
        id: faker.random.uuid(),
      };
    } else if (this.props.typeForm === 'edit') {
      const { id, taskId, userId, task } = this.props.pagePayload;
      obj = {
        id,
        task,
        note,
        date: getTimestampFromString(date),
        taskId,
        userId,
      };
    }
    this.props.createTrack(obj, typeForm);
    this.props.toggleModal();
  };
  render() {
    const { typeForm } = this.props;
    const { date, note } = this.state;
    const { name: task } = this.props.pagePayload;
    return (
      <div className='track-page'>
        <div className='track'>
          <h3 className='track-page__title'>{helperTrackPage[typeForm].title(typeForm !== 'create' ? task : null)}</h3>
          <form autoComplete='off'>
            <label for='track-date'>Date</label>
            <input
              name='date'
              id='track-date'
              type='date'
              value={date}
              onChange={this.handleChange}
              disabled={typeForm === 'detail'}
              required
            />
            <label for='track-note'>Note</label>
            <textarea
              name='note'
              id='track-note'
              rows={typeForm === 'detail' ? 0 : 10}
              onChange={this.handleChange}
              value={note}
              required
              disabled={typeForm === 'detail'}
            ></textarea>
            {typeForm !== 'detail' && (
              <Button buttonName='Save' buttonClass='btn-form-save' handleClick={this.handleSubmit} />
            )}
            <Button buttonName='Back' buttonClass='btn-form-back' handleClick={this.props.toggleModal} />
          </form>
        </div>
      </div>
    );
  }
}
TrackPage.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  typeForm: PropTypes.string.isRequired,
  pagePayload: PropTypes.object.isRequired,
};

export default TrackPage;
