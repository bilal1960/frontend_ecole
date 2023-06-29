import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import React from 'react';
import LogoutButton from './LogoutButton';
import PermissionGuard from './PermissionGuard';

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
            <PermissionGuard permission={'write:inscrit'}>
            <Nav.Link eventKey="Inscription">Inscription</Nav.Link>
            </PermissionGuard>
            <PermissionGuard permission={'write:matiere'}>
            <Nav.Link eventKey="Matière">Matière</Nav.Link>
            </PermissionGuard>
            <PermissionGuard permission={'read:matiere'}>
            <Nav.Link eventKey="ListMatiere">Listmatiere</Nav.Link>
            </ PermissionGuard>
            <PermissionGuard permission={"read:inscrit"}>
            <Nav.Link eventKey="Listinscription">ListInscription</Nav.Link>
            </PermissionGuard>
            <LogoutButton/>


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
