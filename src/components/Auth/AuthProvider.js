import React from 'react';

import { db } from '../../firebase';
export const AuthContext = React.createContext();

export class AuthProvider extends React.Component {
  state = {
    currentUser: null,
  };
  componentDidMount() {
    db.firebaseApp.auth().onAuthStateChanged((user) => {
      user ? this.setState({ currentUser: user.email }) : this.setState({ currentUser: null });
    });
  }
  render() {
    return <AuthContext.Provider value={this.state.currentUser}>{this.props.children}</AuthContext.Provider>;
  }
}
