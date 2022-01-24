import React from 'react';
import './App.scss';
import Layout from './components/Layout/Layout';
import Providers from './providers/Providers';

function App() {
  return (
    <Providers>
      <Layout />
    </Providers>
  );
}

export default App;
