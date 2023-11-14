import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import Header from '../header_menu/Header';
import LoginButton from '../connexion/LoginButton';
import PersonneGestion from '../personne/PersonneGestion';
import MatiereGestion from '../matiere/MAtiereGestion';
import MatieresEtudiant from '../matiere/MatieresEtudiant';
import InscriptionGestion from '../inscription/InscriptionGestion';
import InscriptionEtudiant from '../inscription/InscriptionEtudiant';
import PersonneAffichage from '../personne/PersonneAffichage';
import EcoleAffichage from '../school/EcoleAffichage';
import AbsenceGestion from '../absence/AbsenceGestion';
import AbsenceProfGestion from '../absence/AbsenceProfGestion';
import PresenceEtudiant from '../absence/PresenceEtudiant';
import { useTranslation } from 'react-i18next';
import Lang from '../langue/Lang';
import MapComponent from '../map/MapComponent';
import CalendarComponent from '../calendrier/CalendarComponent';
import ReactPayPal from '../payement/ReactPayPal';
import VacanceProfGestion from '../vacance/VacanceProfGestion';
import AffichageVacance from '../vacance/AffichageVacance';
import NoteGestion from '../note/Notegestion'; 
import AffichageNotes from '../note/AffichageNotes';

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
            {activeMenu === 'Vacance' && <VacanceProfGestion />}
            {activeMenu === 'ListVacance' && <AffichageVacance />}
            {activeMenu === 'Note' && <NoteGestion />}
            {activeMenu === 'ListNote' && <AffichageNotes />}


          </Container>
        </div>
      ) : (
        <LoginButton />

      )}
    </>
  );
}

export default App;
