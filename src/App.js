import React from 'react';

import DimsApp from './components/DimsApp';
import { AuthProvider } from './components/Auth/AuthProvider';

function App() {
  return (
    // <AuthProvider>
    <div className='App'>
      <DimsApp />
    </div>
    // </AuthProvider>
  );
}

export default App;
