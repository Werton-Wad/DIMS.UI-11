import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import { convertDate } from '../utilis';
import helperTrackPage from './helperTrackPage';

class TrackPage extends React.Component {
  state = {
    task: '',
    date: '',
    note: '',
  };
  componentDidMount() {
    if (this.props.typeForm !== 'create') {
      const { note, task, date } = this.props.track;
      this.setState(() => {
        return {
          task,
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
    /* logic */
    this.props.toggleModal();
  };
  render() {
    console.log(this.props);
    const { typeForm } = this.props;
    const { date, note, task } = this.state;
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
  track: PropTypes.object,
};

export default TrackPage;
