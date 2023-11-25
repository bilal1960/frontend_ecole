import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Accueil from '../header_menu/Accueil';
import PersonneGestion from '../personne/PersonneGestion';
import InscriptionGestion from '../inscription/InscriptionGestion';
import PersonneAffichage from '../personne/PersonneAffichage'
import InscriptionEtudiant from '../inscription/InscriptionEtudiant';
import MatiereGestion from '../matiere/MAtiereGestion';
import MatiereEtudiant from '../matiere/MatieresEtudiant';
import AbsenceProfGestion from '../absence/AbsenceProfGestion';
import PresenceEtudiant from '../absence/PresenceEtudiant';
import EcoleAffichage from '../school/EcoleAffichage';
import AbsenceGestion from '../absence/AbsenceGestion';
import VacanceProfGestion from "../vacance/VacanceProfGestion";
import AffichageVacance from "../vacance/AffichageVacance";
import NoteGestion from "../note/NoteGestion"; 
import AffichageNotes from "../note/AffichageNotes";
import MapComponent from '../map/MapComponent';
import CalendarComponent from "../calendrier/CalendarComponent";
import ReactPayPal from "../payement/ReactPayPal";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/personne" element={<PersonneGestion />} />
      <Route path="/personnes" element={<PersonneAffichage />} />
      <Route path="/inscription" element={<InscriptionGestion />} />
      <Route path="/inscriptions" element={<InscriptionEtudiant />} />
      <Route path="/matière" element={<MatiereGestion />} />
      <Route path="/matières" element={<MatiereEtudiant />} />
      <Route path="/absence" element={<AbsenceProfGestion />} />
      <Route path="/absenceetudiant" element={<AbsenceGestion />} />
      <Route path="/absences" element={<PresenceEtudiant />} />
      <Route path="/ecole" element={<EcoleAffichage />} />
      <Route path="/vacance" element={<VacanceProfGestion />} />
      <Route path="/vacances" element={<AffichageVacance />} />
      <Route path="/note" element={<NoteGestion />} />
      <Route path="/notes" element={<AffichageNotes />} />
      <Route path="/map" element={<MapComponent />} />
      <Route path="/calendrier" element={<CalendarComponent />} />
      <Route path="/payer" element={<ReactPayPal />} />

      

    </Routes>
  );
}

export default AppRoutes;
