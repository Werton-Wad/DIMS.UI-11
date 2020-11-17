import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import { getFullName } from '../helpers';
import { convertDate } from '../utilis';
import helperRegisterPage from './helperRegisterPage';

class RegisterPage extends React.Component {
  state = {
    name: '',
    lastName: '',
    direction: '',
    email: '',
    sex: '',
    education: '',
    birthDate: '',
    universityAverageScore: null,
    mathScore: null,
    address: '',
    mobilePhone: null,
    skype: '',
    startDate: '',
  };
  componentDidMount() {
    if (this.props.typeForm !== 'create') {
      const {
        firstName,
        lastName,
        direction,
        education,
        email,
        sex,
        mathScore,
        birthDate,
        universityAverageScore,
        address,
        mobilePhone,
        skype,
        startDate,
      } = this.props.member;
      this.setState(() => {
        return {
          name: firstName,
          lastName,
          direction,
          education,
          email,
          sex,
          mathScore,
          birthDate: convertDate(startDate, true),
          universityAverageScore,
          address,
          mobilePhone,
          skype,
          startDate: convertDate(startDate, true),
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
    const { typeForm, toggleModal } = this.props;
    const {
      name,
      lastName,
      direction,
      email,
      sex,
      education,
      birthDate,
      universityAverageScore,
      mathScore,
      address,
      mobilePhone,
      skype,
      startDate,
    } = this.state;
    return (
      <div className='register-page'>
        <div className='register'>
          <h3 className='register-page__title'>
            {helperRegisterPage[typeForm].title(typeForm !== 'create' ? getFullName(name, lastName) : null)}
          </h3>
          <form autoComplete='off'>
            <div className='form-elems'>
              <div>
                <label for='register-name'>Name</label>
                <input
                  name='name'
                  id='register-name'
                  type='text'
                  value={name}
                  onChange={this.handleChange}
                  disabled={typeForm === 'detail'}
                  required
                />
                <label for='register-last-name'>Last Name</label>
                <input
                  name='lastName'
                  id='register-last-name'
                  type='text'
                  value={lastName}
                  onChange={this.handleChange}
                  disabled={typeForm === 'detail'}
                  required
                />
                <label for='register-education'>Education</label>
                <input
                  name='education'
                  id='register-education'
                  type='text'
                  value={education}
                  onChange={this.handleChange}
                  disabled={typeForm === 'detail'}
                  required
                />
                <label for='register-email'>E-mail</label>
                <input
                  name='email'
                  id='register-email'
                  type='text'
                  value={email}
                  onChange={this.handleChange}
                  disabled={typeForm === 'detail'}
                  required
                />
              </div>
              <div>
                <label for='register-birth-date'>Birth Date</label>
                <input
                  name='birthDate'
                  id='register-birth-date'
                  type='date'
                  value={birthDate}
                  onChange={this.handleChange}
                  disabled={typeForm === 'detail'}
                  required
                />
                <label for='register-direction'>Direction</label>
                <select id='register-direction' name='direction' required disabled={typeForm === 'detail'}>
                  <option selected={'java' === direction}>java</option>
                  <option selected={'.net' === direction}>.net</option>
                  <option selected={'frontend' === direction}>frontend</option>
                  <option selected={'php' === direction}>php</option>
                </select>
                <label for='register-university-score'>University average score</label>
                <input
                  name='universityAverageScore'
                  id='register-university-score'
                  type='number'
                  value={universityAverageScore}
                  onChange={this.handleChange}
                  disabled={typeForm === 'detail'}
                  required
                />
                <label for='register-math-score'>Math score</label>
                <input
                  name='mathScore'
                  id='register-math-score'
                  type='number'
                  value={mathScore}
                  onChange={this.handleChange}
                  disabled={typeForm === 'detail'}
                  required
                />
              </div>
              <div>
                <label for='register-address'>Address</label>
                <input
                  name='address'
                  id='register-address'
                  type='text'
                  value={address}
                  onChange={this.handleChange}
                  disabled={typeForm === 'detail'}
                  required
                />
                <label for='register-phone'>Mobile phone</label>
                <input
                  name='mobilePhone'
                  id='register-phone'
                  type='text'
                  value={mobilePhone}
                  onChange={this.handleChange}
                  disabled={typeForm === 'detail'}
                  required
                />
                <label for='register-skype'>Skype</label>
                <input
                  name='skype'
                  id='register-skype'
                  type='text'
                  value={skype}
                  onChange={this.handleChange}
                  disabled={typeForm === 'detail'}
                  required
                />
                <div className='radio-btn-sex'>
                  <label>Sex</label>
                  <label className='label-sex' for='male'>
                    <span className='title-radio-input'>Male</span>
                    <input type='radio' name='sex' id='male' checked={'male' === sex} />
                  </label>
                  <label className='label-sex' for='female'>
                    <span className='title-radio-input'>Female</span>
                    <input type='radio' name='sex' id='female' checked={'female' === sex} />
                  </label>
                </div>
              </div>
              <div>
                <label for='register-start-date'>Start Date</label>
                <input
                  name='startDate'
                  id='register-start-date'
                  type='date'
                  value={startDate}
                  onChange={this.handleChange}
                  disabled={typeForm === 'detail'}
                  required
                />
              </div>
            </div>
            {typeForm !== 'detail' && (
              <Button buttonName='Save' buttonClass='btn-form-save' handleClick={this.handleSubmit} />
            )}
            <Button buttonName='Back' buttonClass='btn-form-back' handleClick={toggleModal} />
          </form>
        </div>
      </div>
    );
  }
}
RegisterPage.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  typeForm: PropTypes.string.isRequired,
};
export default RegisterPage;
