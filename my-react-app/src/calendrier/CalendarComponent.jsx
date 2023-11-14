import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Modal, Button } from 'react-bootstrap'; // Importation des composants Bootstrap
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation du CSS de Bootstrap
import 'moment/locale/fr';

moment.locale('fr');
const localizer = momentLocalizer(moment);

const frenchMessages = {
  // ... (vos messages en français)
};

const CalendarComponent = () => {
  const events = [{
    start: new Date('2023-07-01'), 
      end: new Date('2023-07-12'),  
      title: 'Session d\'inscription de juillet',
      type: 'inscription'
    },
    {
      start: new Date('2023-08-05'), 
      end: new Date('2023-08-16'),  
      title: 'Session d\'inscription d\'août',
      type: 'inscription'
    },
    {
      start: new Date('2023-08-28'),
      end: new Date('2023-08-28'),
      title: 'Rentrée scolaire'
    },
    {
      start: new Date('2023-09-27'),
      end: new Date('2023-09-27'),
      title: 'Fête de la Communauté française'
    },
    {
      start: new Date('2023-10-23'),
      end: new Date('2023-11-03'),
      title: 'Congé d\'automne (Toussaint)'
    },
    {
      start: new Date('2023-12-25'),
      end: new Date('2024-01-05'),
      title: 'Vacances d\'hiver (Noël)'
    },
    {
      start: new Date('2024-02-13'),
      end: new Date('2024-02-13'),
      title: 'Mardi gras'
    },
    {
      start: new Date('2024-02-26'),
      end: new Date('2024-03-08'),
      title: 'Congé de détente (Carnaval)'
    },
    {
      start: new Date('2024-04-01'),
      end: new Date('2024-04-01'),
      title: 'Lundi de Pâques'
    },
    {
      start: new Date('2024-04-29'),
      end: new Date('2024-05-10'),
      title: 'Vacances de printemps (Pâques)'
    },
    {
      start: new Date('2024-05-20'),
      end: new Date('2024-05-20'),
      title: 'Lundi de Pentecôte'
    },
    {
      start: new Date('2024-07-06'),
      end: new Date('2024-08-25'), // Assumant que les vacances d'été se terminent à la fin du mois d'août
      title: 'Vacances d\'été'
    },
  
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEvent, setModalEvent] = useState({});

  const handleEventClick = (event) => {
    setModalEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalEvent({});
  };

  return (
    <div style={{ height: '700px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventClick}
        messages={frenchMessages}
        style={{ height: '100vh' }}
      />

      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Détails de l'événement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Titre:</strong> {modalEvent.title}</p>
          <p><strong>Date de début:</strong> {modalEvent.start?.toLocaleDateString()}</p>
          <p><strong>Date de fin:</strong> {modalEvent.end?.toLocaleDateString()}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CalendarComponent;
