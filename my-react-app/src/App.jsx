import './App.css'
import Header from './Header'
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import PersonnelForm from './PersonnelForm';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

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
        
       <Header activeMenu={activeMenu} onMenuChange={setActiveMenu}/>

       <Container>
        {activeMenu === 'accueil' && <h2>accueil</h2>}
        {activeMenu === 'Personne' && <PersonnelForm/>}
        
      </Container>
    
    </>
    ):(
      <LoginButton/> 
    )}
    </>
  );
  
}

export default App
