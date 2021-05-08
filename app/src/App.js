import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {Container} from 'react-bootstrap'
import Footer from './components/Footer';
import Lots from './components/Lots';

const App = () => {
  return (
    <Container fluid className="app">
      <Lots />
      <Footer />
    </Container>
  );
}

export default App;
