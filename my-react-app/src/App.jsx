import './App.css'
import Header from './Header'
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton';
import PersonneGestion from './PersonneGestion';
import MatiereGestion from './MAtiereGestion';
import MatieresEtudiant from './MatieresEtudiant';
import InscriptionGestion from './InscriptionGestion';
import InscriptionEtudiant from './InscriptionEtudiant';
import PersonneAffichage from './PersonneAffichage';
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
      <div>
       <Header activeMenu={activeMenu} onMenuChange={setActiveMenu}/>
       <Container>
        {activeMenu === 'accueil' && <h2>accueil</h2>}
        {activeMenu === 'Personne' && <PersonneGestion/>}
        {activeMenu === 'Inscription' && <InscriptionGestion/>}
        {activeMenu === 'Matière' && <MatiereGestion/>}
        {activeMenu === 'ListMatiere'&& <MatieresEtudiant />}
        {activeMenu === 'Listinscription' && <InscriptionEtudiant/>}
        {activeMenu === 'ListPersonne' && <PersonneAffichage/>}

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
