import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Modal, Button } from 'react-bootstrap'; // Importation des composants Bootstrap
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation du CSS de Bootstrap
import 'moment/locale/fr';
import { useTranslation } from 'react-i18next';



moment.locale('fr');
const localizer = momentLocalizer(moment);

const CalendarComponent = () => {

  const { t, i18n } = useTranslation();
  const [localizedMessages, setLocalizedMessages] = useState({});

  useEffect(() => {
    setLocalizedMessages({
      month: t("calenda.month"),
      week: t("calenda.week"),
      day: t("calenda.day"),
      agenda: t("calenda.agenda"),
      today: t("calenda.today"),
      previous: t("calenda.previous"),
      next: t("calenda.next"),
      
    });
  }, [t, i18n.language]);

  

  const events = [{
    start: new Date('2023-07-03'), 
      end: new Date('2023-07-07'),  
      title: t("julyRegistrationSession"),
      type: 'inscription'
    },
    {
      start: new Date('2023-07-10'), 
        end: new Date('2023-07-14'),  
        title: t("julyRegistrationSession"),
        type: 'inscription'
    },
    {
      start: new Date('2023-08-14'), 
      end: new Date('2023-08-18'),  
      title: t("augustRegistrationSession"),
      type: 'inscription'
    },
    {
      start: new Date('2023-08-21'), 
      end: new Date('2023-08-25'),  
      title: t("augustRegistrationSession"),
      type: 'inscription'
    },
    {
      start: new Date('2023-08-28'),
      end: new Date('2023-08-28'),
      title: t("back to school")
    },
    {
      start: new Date('2023-09-27'),
      end: new Date('2023-09-27'),
      title: t("French Community Day")
    },
    {
      start: new Date('2023-10-23'),
      end: new Date('2023-11-03'),
      title: t("Autumn Break (All Saints' Day)")
    },
    {
      start: new Date('2023-12-25'),
      end: new Date('2024-01-05'),
      title: t("Winter Break (Christmas)")
    },
    {
      start: new Date('2024-02-13'),
      end: new Date('2024-02-13'),
      title: 'Mardi gras'
    },
    {
      start: new Date('2024-02-26'),
      end: new Date('2024-03-08'),
      title: t("Carnival Break")
    },
    {
      start: new Date('2024-04-01'),
      end: new Date('2024-04-01'),
      title: t("Easter Monday")
    },
    {
      start: new Date('2024-04-29'),
      end: new Date('2024-05-10'),
      title: t("Spring Break (Easter)")
    },
    {
      start: new Date('2024-05-20'),
      end: new Date('2024-05-20'),
      title: t("Pentecost Monday")
    },
    {
      start: new Date('2024-07-06'),
      end: new Date('2024-08-25'), 
      title: t("Summer Holidays")
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
    <div className='calendar-container'     style={{ height: '700px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventClick}
        messages={localizedMessages}
        style={{ height: '100vh' }}
      />

      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t("eventDetails")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>{t("title")}</strong> {modalEvent.title}</p>
          <p><strong>{t("start date")}</strong> {modalEvent.start?.toLocaleDateString()}</p>
          <p><strong>{t("end date")}</strong> {modalEvent.end?.toLocaleDateString()}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>{t("close")}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CalendarComponent;
