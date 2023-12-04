import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import LogoutButton from '../connexion/LogoutButton';
import PermissionGuard from '../permission/PermissionGuard';
import { useTranslation } from 'react-i18next';
import DropdownGroup from './DropdownGroup';
import { NavLink } from 'react-router-dom';

function Header({ activeMenu, onMenuChange }) {
  const { t } = useTranslation();
  
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">{t("School Management")}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav activeKey={activeMenu} className="me-auto" onSelect={onMenuChange}>
            <Nav.Link as={NavLink}to="/">{t('home')}</Nav.Link>
            <PermissionGuard permission="write:personne">
            <Nav.Item>
                <Nav.Link as={NavLink} to="/personne">{t('person')}</Nav.Link>
              </Nav.Item>
            </PermissionGuard>
            <PermissionGuard permission="write:inscrit">
               <Nav.Item>
                <Nav.Link as={NavLink} to="/inscription">{t('registrer')}</Nav.Link>
              </Nav.Item>
            </PermissionGuard>
            <PermissionGuard permission="write:matiere">
              <Nav.Item>
              <Nav.Link as={NavLink} to= "/matière">{t('addSubject')}</Nav.Link>
              </Nav.Item>
            </PermissionGuard>
            <Nav.Link as={NavLink} to="/ecole">{t('school')}</Nav.Link>
            <PermissionGuard permission="write:presence">
            <Nav.Link as={NavLink}to="/absenceetudiant">Absence</Nav.Link>
            </PermissionGuard>
            <PermissionGuard permission="write:profabsent">
            <Nav.Link as={NavLink}to= "/absence">absence</Nav.Link>
            </PermissionGuard>
            <Nav.Link as={NavLink}to="/map">Map</Nav.Link>
            <Nav.Link as={NavLink}to="/calendrier">{t("calendar")}</Nav.Link>
            <PermissionGuard permission="read:payement">
            <Nav.Link as={NavLink}to="/payer">Paypal</Nav.Link>
            </PermissionGuard>
            <PermissionGuard permission="read:vacance">
            <Nav.Link as={NavLink}to= "/vacance">{t("Holiday")}</Nav.Link>
            </PermissionGuard>
             <PermissionGuard permission="write:note">
            <Nav.Link as={NavLink}to="/note">Note</Nav.Link>
            </PermissionGuard>
            <DropdownGroup activeMenu={activeMenu} onMenuChange={onMenuChange} />
            <LogoutButton/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
