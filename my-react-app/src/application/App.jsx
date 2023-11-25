import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import Header from '../header_menu/Header';
import LoginButton from '../connexion/LoginButton';
import AppRoutes from '../route/AppRoutes'; 
import Footer from '../footer/Footer';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>En chargement....</div>;
  }

  return (
    <Router>
      {isAuthenticated ? (
        <div className="App">
          <Header/>
          <Container>
            <AppRoutes /> 
            <Footer />
          </Container>
        </div>
      ) : (
        <LoginButton />
      )}
    </Router>
  );
}

export default App;
