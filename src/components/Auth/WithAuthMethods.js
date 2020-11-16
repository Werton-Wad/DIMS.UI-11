import React from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';

function withAuthMethods(Component) {
  class WithAuthMethods extends React.Component {
    constructor() {
      super();
      this.auth = firebase.auth();
      this.googleProvider = new firebase.auth.GoogleAuthProvider();
      this.facebookProvider = new firebase.auth.FacebookAuthProvider();
      this.githubProvider = new firebase.auth.GithubAuthProvider();
    }
    signIn = async (email, password) => {
      try {
        await this.auth.signInWithEmailAndPassword(email, password);
        this.props.history.push('/members');
      } catch (e) {
        alert('Что-то пошло не так');
      }
    };
    signInWithGoogle = async () => {
      try {
        await this.auth.signInWithPopup(this.googleProvider);
        this.props.history.push('/members');
      } catch (e) {
        if (e.code === 'auth/account-exists-with-different-credential') {
          this.props.history.push('/members');
        } else {
          alert('Error');
        }
      }
    };
    signInWithFacebook = async () => {
      try {
        await this.auth.signInWithPopup(this.facebookProvider);
        this.props.history.push('/members');
      } catch (e) {
        if (e.code === 'auth/account-exists-with-different-credential') {
          this.props.history.push('/members');
        } else {
          alert('Error');
        }
      }
    };
    signInWithGithub = async () => {
      try {
        await this.auth.signInWithPopup(this.githubProvider);
        this.props.history.push('/members');
      } catch (e) {
        if (e.code === 'auth/account-exists-with-different-credential') {
          this.props.history.push('/members');
        } else {
          alert('Error');
        }
      }
    };
    signUp = async () => {
      await firebase.auth().signOut();
      this.props.history.push('/login');
    };

    render() {
      return (
        <Component
          {...this.props}
          signIn={this.signIn}
          signInWithGoogle={this.signInWithGoogle}
          signInWithFacebook={this.signInWithFacebook}
          signInWithGithub={this.signInWithGithub}
          signUp={this.signUp}
        />
      );
    }
  }

  return withRouter(WithAuthMethods);
}

export default withAuthMethods;
