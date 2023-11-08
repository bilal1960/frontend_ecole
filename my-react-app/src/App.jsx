import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import Header from './Header';
import LoginButton from './LoginButton';
import PersonneGestion from './PersonneGestion';
import MatiereGestion from './MAtiereGestion';
import MatieresEtudiant from './MatieresEtudiant';
import InscriptionGestion from './InscriptionGestion';
import InscriptionEtudiant from './InscriptionEtudiant';
import PersonneAffichage from './PersonneAffichage';
import EcoleAffichage from './EcoleAffichage';
import AbsenceGestion from './AbsenceGestion';
import AbsenceProfGestion from './AbsenceProfGestion';
import PresenceEtudiant from './PresenceEtudiant';
import { useTranslation } from 'react-i18next';
import Lang from './Lang';
import MapComponent from './MapComponent';
import CalendarComponent from './CalendarComponent';
import ReactPayPal from './payement/ReactPayPal';

function App() {
  const [activeMenu, setActiveMenu] = useState('');
  const { isAuthenticated, isLoading } = useAuth0();
  const { t } = useTranslation();

  if (isLoading) {
    return <div>En chargement....</div>;
  }

  return (
    <>

      {isAuthenticated ? (
        <div>
          <Lang />
          <p>{t('common.translated-text')}</p>
          <Header activeMenu={activeMenu} onMenuChange={setActiveMenu}  />
          <Container>
            {activeMenu === 'accueil' && <h2>Accueil</h2>}
            {activeMenu === 'Personne' && <PersonneGestion />}
            {activeMenu === 'Inscription' && <InscriptionGestion />}
            {activeMenu === 'Matière' && <MatiereGestion />}
            {activeMenu === 'ListMatiere' && <MatieresEtudiant />}
            {activeMenu === 'Listinscription' && <InscriptionEtudiant />}
            {activeMenu === 'ListPersonne' && <PersonneAffichage />}
            {activeMenu === 'Ecole' && <EcoleAffichage />}
            {activeMenu === 'Absence' && <AbsenceGestion />}
            {activeMenu === 'ListAbsence' && <PresenceEtudiant />}
            {activeMenu === 'ProfAbsent' && <AbsenceProfGestion />}
            {activeMenu === 'Map' && <MapComponent />}
            {activeMenu === 'Calendrier' && <CalendarComponent />}
            {activeMenu === 'Paypal' && <ReactPayPal />}
          </Container>
        </div>
      ) : (
        <LoginButton />

      )}
    </>
  );
}

export default App;
