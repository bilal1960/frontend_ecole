import './App.css'
import Header from './Header'
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import ListPersonnel from './ListPersonnel';
import useSWR from "swr"
import InscriptionForm from './InscriptionForm';
import MatiereForm from './MatiereForm';
import PersonneGestion from './PersonneGestion';


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
      <p>bonjour {user.name} <LogoutButton/></p>
      <ListPersonnel personnels={personnels}/>
        
       <Header activeMenu={activeMenu} onMenuChange={setActiveMenu}/>

       <Container>
        {activeMenu === 'accueil' && <h2>accueil</h2>}
        {activeMenu === 'Personne' && <PersonneGestion/>}
        {activeMenu === 'Inscription' && <InscriptionForm/>}
        {activeMenu === 'Matière' && <MatiereForm/>}
      </Container>
    
    </>
    ):(
      <LoginButton/> 
    )}
    </>
  );
  
}

export default App
