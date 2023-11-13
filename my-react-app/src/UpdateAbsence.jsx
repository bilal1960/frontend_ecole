import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
import { format,parse } from 'date-fns';


const UpdateAbsence = ({ item, onUpdateAbsence }) => {
    const { t } = useTranslation();
    const [presence, setPresence] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [certificate, setCertificate] = useState(item.certficat === "true");


    const handlePresenceChange = (e) => {
        setPresence(e.target.value);
    };

    const handleDate = (e) => {
       
    setDate(e.target.value);
    };

    const handlestartTime = (e) => {
        setStartTime(e.target.value);
    };

    const handlecertificat = (e) => {
        setCertificate(e.target.checked);

    };

    const handleEndTime = (e) => {
        setEndTime(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();


       
        const updatedabsence = {
            ...item,
            presence: presence !== '' ? presence : item.presence,
            heuredebut: startTime !== '' ? startTime : item.heuredebut,
            heurefin: endTime !== '' ? endTime : item.heurefin,
            certficat: certificate !== '' ? certificate : item.certficat,
        
            
        };


        if(presence !== ''){
            updatedabsence.presence = presence;
        }

        if(date !==''){
            const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
            updatedabsence.date = format(parsedDate, 'dd/MM/yyyy');
        }

        
        
        if(startTime !== ''){
            updatedabsence.heuredebut = startTime;
        }

        if(endTime !== ''){
            updatedabsence.heurefin = endTime;
        }

        if(certificate !== ''){
            updatedabsence.certficat = certificate;
        }  
       
        onUpdateAbsence(updatedabsence);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="presence">presence</label>
                <input
                    type="text"
                    className="form-control"
                    id="presence"
                    value={presence}
                    onChange={handlePresenceChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="date">date</label>
                <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={date}
                    onChange={handleDate}
                />
            </div>

            <div className="form-group">
                <label htmlFor="debut">debut</label>
                <input
                    type="time"
                    className="form-control"
                    id="startTime"
                    value={startTime}
                    onChange={handlestartTime}
                />
            </div>

            <div className="form-group">
                <label htmlFor="endTime">endTime</label>
                <input
                    type="time"
                    className="form-control"
                    id="endTime"
                    value={endTime}
                    onChange={handleEndTime}
                />
            </div>

    <div className="form-group d-flex align-items-center mb-3" style={{ gap: '10px' }}>  {/* Ajoutez une marge en bas ici */}
    <label htmlFor="reussi" className="mb-0 flex-grow-1">Réussi</label>
    <input 
        type="checkbox" 
        className="form-check-input" 
        id="certificate" 
        name="certificate" 
        checked={certificate} 
        onChange={handlecertificat} 
    />
</div>
            <button type="submit" className="btn btn-primary">{t('update')}</button>
        </form>
    );
};

export default UpdateAbsence;