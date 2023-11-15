import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
import { format,parse } from 'date-fns';

const UpdateVacance = ({ vac, onUpdateVacance }) => {
    const { t } = useTranslation();
    const [datedebut, setDatedebut] = useState('');
    const [datefin, setDatefin] = useState('');
    const [type, setType] = useState('');
    const [commentaire, setCommentaire] = useState('');

    const handledatedebut = (e) => {
        setDatedebut(e.target.value);
    };

    const handledatefin = (e) => {
        setDatefin(e.target.value);
    };

    const handletype = (e) => {
        setType(e.target.value);
    };

    const handlecommentaire = (e) => {
        setCommentaire(e.target.value);
    };
 
    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedVacance = {
            ...vac,
        type: type !== '' ? type : vac.type,
        commentaire: commentaire !== '' ? commentaire : vac.commentaire,
               
        };

        if (datedebut !== '') {
            const parsedDatedebut = parse(datedebut, 'yyyy-MM-dd', new Date());
            if (!isNaN(parsedDatedebut)) {
                updatedVacance.datedebut = format(parsedDatedebut, 'dd/MM/yyyy');
                console.log("Datedebut formaté:", updatedVacance.datedebut);


        }
    }
    
        if (datefin !== '') {
            const parsedDatefin = parse(datefin, 'yyyy-MM-dd', new Date());
            if (!isNaN(parsedDatefin)) {
                updatedVacance.datefin = format(parsedDatefin, 'dd/MM/yyyy');
                console.log("Datefin formaté:", updatedVacance.datefin);

            }
        }
        

        if(type !== ''){
            updatedVacance.type = type;
        }

        if(commentaire !== ''){
            updatedVacance.commentaire = commentaire;
        }

        onUpdateVacance(updatedVacance);


    }

    return (
        <form onSubmit={handleSubmit}>
    <div className="form-group">
        <label htmlFor="datedebut">datedebut</label>
        <input
            type="date"
            className="form-control"
            id="datedebut"
            value={datedebut}
            onChange={handledatedebut}
        />
    </div>

    <div className="form-group">
        <label htmlFor="datefin">{t("end date")}</label>
        <input
            type="date"
            className="form-control"
            id="datefin"
            value={datefin}
            onChange={handledatefin}
        />
    </div>

    <div className="form-group">
        <label htmlFor="type">Type</label>
        <input
            type="text"
            className="form-control"
            id="type"
            value={type}
            onChange={handletype}
        />
    </div>

    <div className="form-group">
        <label htmlFor="commentaire">{t("comment")}</label>
        <input
            type="text"
            className="form-control"
            id="commentaire"
            value={commentaire}
            onChange={handlecommentaire}
        />
    </div>

    <button type="submit" className="btn btn-primary">{t('update')}</button>
</form>

    );


}


export default UpdateVacance