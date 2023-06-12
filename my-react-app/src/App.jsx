
import './App.css'
import Header from './Header'
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import PersonnelForm from './PersonnelForm';

function App() {
  const [activeMenu, setActiveMenu] = useState('');


  return (
    <>
      
       
       <Header activeMenu={activeMenu} onMenuChange={setActiveMenu}/>
       <Container>
        
        {activeMenu === 'accueil' && <h2>accueil</h2>}
        {activeMenu === 'Personne' && <PersonnelForm/>} 
      </Container>
      
    </>
  )
}

export default App
