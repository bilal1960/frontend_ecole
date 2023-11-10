import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import LogoutButton from './LogoutButton';
import PermissionGuard from './PermissionGuard';
import { useTranslation } from 'react-i18next';
import DropdownGroup from './DropdownGroup';
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
            <Nav.Link eventKey="Ecole">{t('school')}</Nav.Link>
            <PermissionGuard permission="write:presence">
            <Nav.Link eventKey="Absence">Absence</Nav.Link>
            </PermissionGuard>
            <PermissionGuard permission="write:profabsent">
            <Nav.Link eventKey="ProfAbsent">ProfAbsent</Nav.Link>
            </PermissionGuard>
            <Nav.Link eventKey="Map">Map</Nav.Link>
            <Nav.Link eventKey="Calendrier">Calendrier</Nav.Link>
            <Nav.Link eventKey="Paypal">Paypal</Nav.Link>
            <Nav.Link eventKey="Vacance">Vacance</Nav.Link>
            <DropdownGroup activeMenu={activeMenu} onMenuChange={onMenuChange} />
            <LogoutButton/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
