import React from 'react';
import auth from '../Auth/auth';

class Login extends React.PureComponent {
  state = {
    email: '',
    password: '',
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className='login-wrapper'>
        <div className='login-page'>
          <h3 className='login-page__title'>user login</h3>
          <form autoComplete='off'>
            <input type='text' placeholder='Email' name='email' onChange={this.handleChange} required />
            <input type='password' placeholder='Password' name='password' onChange={this.handleChange} required />
            <button type='submit'>sign in</button>
          </form>
          <div className='buttons-container'>
            <button>sign in with google</button>
            <button>sigh in with facebook</button>
            <button>sigh in with github</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
