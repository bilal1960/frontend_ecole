import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import React from 'react';

function Header({ activeMenu, onMenuChange }) {

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Inscription ecole</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav activeKey={activeMenu} className="me-auto" onSelect={onMenuChange}>
            <Nav.Link eventKey="Accueil">Accueil</Nav.Link>
            <Nav.Link eventKey="Personne">Personne</Nav.Link>
            <Nav.Link eventKey="Inscription">Inscription</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
