import React from 'react';
import faker from 'faker';
import PropTypes from 'prop-types';

import Button from '../Button';
import { getFullName } from '../helpers';
import { convertDate, getTimestampFromString } from '../utilis';
import helperRegisterPage from './helperRegisterPage';
import { db } from '../../firebase';

class RegisterPage extends React.PureComponent {
  state = {
    firstName: '',
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
    directions: [],
    isLoading: true,
  };
  async componentDidMount() {
    const directions = await db.getDirections();
    if (this.props.typeForm !== 'create') {
      const {
        id,
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
      } = this.props.pagePayload;
      this.setState(() => {
        return {
          id,
          firstName,
          lastName,
          direction,
          education,
          email,
          sex,
          mathScore,
          birthDate: convertDate(birthDate, true),
          universityAverageScore,
          address,
          mobilePhone,
          skype,
          startDate: convertDate(startDate, true),
          directions,
          isLoading: false,
        };
      });
    } else {
      this.setState({ directions, isLoading: false });
    }
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { directions, isLoading, startDate, birthDate, ...member } = this.state;
    const { typeForm } = this.props;
    let obj = {};
    if (this.props.typeForm === 'create') {
      obj = {
        ...member,
        startDate: getTimestampFromString(startDate),
        birthDate: getTimestampFromString(birthDate),
        id: faker.random.uuid(),
      };
    } else if (this.props.typeForm === 'edit') {
      obj = {
        ...member,
        startDate: getTimestampFromString(startDate),
        birthDate: getTimestampFromString(birthDate),
      };
    }
    this.props.registerMember(obj, typeForm);
    this.props.toggleModal();
  };
  render() {
    const { typeForm, toggleModal } = this.props;
    const {
      firstName,
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
      directions,
      isLoading,
    } = this.state;
    return !isLoading ? (
      <div className='register-page'>
        <div className='register'>
          <h3 className='register-page__title'>
            {helperRegisterPage[typeForm].title(
              typeForm !== 'create'
                ? getFullName(this.props.pagePayload.firstName, this.props.pagePayload.lastName)
                : null,
            )}
          </h3>
          <form autoComplete='off'>
            <div className='form-elems'>
              <div>
                <label for='register-name'>Name</label>
                <input
                  name='firstName'
                  id='register-name'
                  type='text'
                  value={firstName}
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
                <select id='register-direction' onChange={this.handleChange} name='direction' required>
                  {directions.map((item) => {
                    const { id, direction: name } = item;
                    return <option key={id}>{name}</option>;
                  })}
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
                    <input type='radio' name='sex' onChange={this.handleChange} value='mail' id='male' />
                  </label>
                  <label className='label-sex' for='female'>
                    <span className='title-radio-input'>Female</span>
                    <input type='radio' name='sex' onChange={this.handleChange} value='female' id='female' />
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
    ) : (
      ''
    );
  }
}
RegisterPage.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  typeForm: PropTypes.string.isRequired,
  pagePayload: PropTypes.object,
};
export default RegisterPage;
