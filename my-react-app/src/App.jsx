import './App.css'
import Header from './Header'
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import useSWR from "swr"
import InscriptionForm from './InscriptionForm';
import PersonneGestion from './PersonneGestion';
import MatiereGestion from './MAtiereGestion';
import MatieresEtudiant from './MatieresEtudiant';
import PermissionGuard from './PermissionGuard';
import { Pagination } from 'react-bootstrap';
function App() {
  const [activeMenu, setActiveMenu] = useState('');
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [personnels, setPersonnelss] = useState('' || []);

  if(isLoading){
    return <div>en chargement....</div>;
  }
  
  return (
    <>
    {isAuthenticated ? (
      <>
      <div>
       <Header activeMenu={activeMenu} onMenuChange={setActiveMenu}/>
       <Container>
        {activeMenu === 'accueil' && <h2>accueil</h2>}
        {activeMenu === 'Personne' && <PersonneGestion/>}
        {activeMenu === 'Inscription' && <InscriptionForm/>}
        {activeMenu === 'Matière' && <MatiereGestion/>}
        {activeMenu === 'ListMatiere'     && <MatieresEtudiant />}



        
      </Container>
      </div>
    </>
    ):(
      <LoginButton/> 
    )}
    </>
  );
  
}

export default App
