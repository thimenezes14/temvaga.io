import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import Footer from './components/Footer';
import Header from './components/Header';
import Lots from './components/Lots';
import SerialStateProvider from './contexts/SerialStateContext';

const App = () => {
  return (
    <SerialStateProvider>
      <Header />
      <Lots />
      <Footer />
    </SerialStateProvider>
  );
}

export default App;
