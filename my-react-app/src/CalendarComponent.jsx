import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Modal, Button, Form } from 'react-bootstrap'; // Importation des composants Bootstrap
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation du CSS de Bootstrap
import 'moment/locale/fr';
import PermissionGuard from './PermissionGuard';


moment.locale('fr');
const localizer = momentLocalizer(moment);

const frenchMessages = {
  // ... (vos messages en français)
};

const isOverlapping = (event1, event2) => {
  return (event1.start < event2.end) && (event1.end > event2.start);
};

const CalendarComponent = () => {
  const events = [
    {
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


  const [eventsList, setEventsList] = useState(events);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEvent, setModalEvent] = useState({});
  const [isViewMode, setIsViewMode] = useState(false);

 

  const deleteEvent = (eventToDelete) => {
    setEventsList((prevEvents) => prevEvents.filter(event => event !== eventToDelete));
    closeModal();

};

  const handleDoubleClickEvent = (event) => {
    setIsViewMode(true);
    openModal(event);
    
};

  const openModal = (event) => {
      setModalEvent(event);
      setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
      setModalEvent({});
  };

  const saveEvent = () => {
    let errorMessage = '';

    if (!modalEvent.nom) {
        errorMessage += "Nom est nécessaire. ";
    }
    if (!modalEvent.prenom) {
        errorMessage += "Prénom est nécessaire. ";
    }
    if (!modalEvent.mail) {
        errorMessage += "Adresse mail est nécessaire. ";
    }

    if (errorMessage) {
        alert(errorMessage.trim());
    } else {
      const newEvent = {
        ...modalEvent,
        title: `RDV inscription école:`
    };
        setEventsList([...eventsList, newEvent]);
        closeModal();
    }
};


  const handleSelectSlot = (slotInfo) => {
    setIsViewMode(false);
    let eventType = 'cours';

      const newEvent = {
          start: slotInfo.start,
          end: slotInfo.end,
          nom: '',
          prénom: '',
          mail: '', 
          type: eventType 
      };

      const dayOfWeek = newEvent.start.getDay();

      if (dayOfWeek === 0 || dayOfWeek === 6) {
          alert("Pas d'événements les samedis et dimanches !");
          return;
      }

      const overlapsWithNonInscriptionEvent = eventsList.some(event => {
        if (event.type === 'inscription')
          return false;
        
        
        return isOverlapping(newEvent, event);
    });
      if (overlapsWithNonInscriptionEvent) {
          alert("Vous ne pouvez pas ajouter un événement pendant une vacance ou un autre événement.");
          return;
      }

      

      openModal(newEvent);
  };

  return (
      <div style={{ height: '700px' }}>
          <Calendar
              localizer={localizer}
              events={eventsList}
              startAccessor="start"
              endAccessor="end"
              onSelectSlot={handleSelectSlot}
              onDoubleClickEvent={handleDoubleClickEvent}  
              selectable={true}
              messages={frenchMessages}
          />
          <Modal show={isModalOpen} onHide={closeModal}>
    <Modal.Header closeButton>
        <Modal.Title>
            {isViewMode ? 'Détails de l\'événement' : 'Ajouter un événement'}
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {isViewMode ? (
            <div>
                <p><strong>Titre:</strong> {modalEvent.title}</p>
                {modalEvent.nom && <p><strong>Nom:</strong> {modalEvent.nom}</p>}
                {modalEvent.prenom && <p><strong>Prénom:</strong> {modalEvent.prenom}</p>}
                {modalEvent.mail && <p><strong>Adresse mail:</strong> {modalEvent.mail}</p>}
            </div>
        ) : (
            <div>
                <Form.Group>
                    <Form.Label>Nom:</Form.Label>
                    <Form.Control 
                        type="text"
                        value={modalEvent.nom || ''}
                        onChange={(e) => setModalEvent({ ...modalEvent, nom: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Prénom:</Form.Label>
                    <Form.Control 
                        type="text"
                        value={modalEvent.prenom || ''}
                        onChange={(e) => setModalEvent({ ...modalEvent, prenom: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Adresse mail:</Form.Label>
                    <Form.Control 
                        type="email"
                        value={modalEvent.mail || ''}
                        onChange={(e) => setModalEvent({ ...modalEvent, mail: e.target.value })}
                    />
                </Form.Group>
            </div>
        )}
    </Modal.Body>
    <Modal.Footer>
        <PermissionGuard permission="write:canDeleteEvent">
            {isViewMode && 
                <Button variant="danger" onClick={() => deleteEvent(modalEvent)}>Supprimer</Button>}
        </PermissionGuard>
        <Button variant="secondary" onClick={closeModal}>Annuler</Button>
        {!isViewMode && <Button variant="primary" onClick={saveEvent}>Sauvegarder</Button>}
    </Modal.Footer>
</Modal>

      </div>
  );
};

export default CalendarComponent;
