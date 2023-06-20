import './App.css'
import Header from './Header'
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import PersonnelForm from './PersonnelForm';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import ListPersonnel from './ListPersonnel';
import useSWR from "swr"
import InscriptionForm from './InscriptionForm';
import MatiereForm from './MatiereForm';


function App() {
  const [activeMenu, setActiveMenu] = useState('');
  const { user, isAuthenticated, isLoading } = useAuth0();

  if(isLoading){
    return <div>en chargement....</div>;
  }
  
  return (
    <>
    {isAuthenticated ? (
      <>
      <p>bonjour {user.name} <LogoutButton/></p>
      <ListPersonnel/>
        
       <Header activeMenu={activeMenu} onMenuChange={setActiveMenu}/>

       <Container>
        {activeMenu === 'accueil' && <h2>accueil</h2>}
        {activeMenu === 'Personne' && <PersonnelForm/>}
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
