import React from 'react';
import withAuthMethods from '../Auth/WithAuthMethods';
import auth from '../Auth/auth';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state.email, this.state.password);
  };
  render() {
    return (
      <div className='login-wrapper'>
        <div className='login-page'>
          <h3 className='login-page__title'>user login</h3>
          <div className='flex-container'>
            <form autoComplete='off'>
              <input type='text' placeholder='Email*' name='email' onChange={this.handleChange} required />
              <input type='password' placeholder='Password*' name='password' onChange={this.handleChange} required />
              <button type='submit' onClick={this.handleSubmit}>
                sign in
              </button>
            </form>
            <div className='text'>or</div>
            <div className='buttons-container'>
              <button onClick={() => this.props.signInWithGoogle()}>sign in with google</button>
              <button onClick={() => this.props.signInWithFacebook()}>sign in with facebook</button>
              <button onClick={() => this.props.signInWithGithub()}>sign in with github</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuthMethods(Login);
