import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import LogoutButton from './LogoutButton';
import PermissionGuard from './PermissionGuard';
import { useTranslation } from 'react-i18next';

function Header({ activeMenu, onMenuChange }) {
  const { t } = useTranslation();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">{t('brand')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav activeKey={activeMenu} className="me-auto" onSelect={onMenuChange}>
            <Nav.Link eventKey="Accueil">{t('home')}</Nav.Link>
            <PermissionGuard permission="write:personne">
            <Nav.Link eventKey="Personne">{t('person')}</Nav.Link>
            </PermissionGuard>
            <PermissionGuard permission="write:inscrit">
              <Nav.Link eventKey="Inscription">{t('registration')}</Nav.Link>
            </PermissionGuard>
            <PermissionGuard permission="write:matiere">
              <Nav.Link eventKey="Matière">{t('addSubject')}</Nav.Link>
            </PermissionGuard>
            <PermissionGuard permission="read:matiere">
              <Nav.Link eventKey="ListMatiere">{t('subjectList')}</Nav.Link>
            </PermissionGuard>
            <PermissionGuard permission="read:inscrit">
              <Nav.Link eventKey="Listinscription">{t('registrationList')}</Nav.Link>
            </PermissionGuard>
            <PermissionGuard permission="read:personne">
              <Nav.Link eventKey="ListPersonne">{t('personList')}</Nav.Link>
            </PermissionGuard>
            <Nav.Link eventKey="Ecole">{t('school')}</Nav.Link>
            <LogoutButton/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
