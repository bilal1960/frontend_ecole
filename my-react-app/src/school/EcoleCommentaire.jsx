import React, { useState } from 'react';

const SchoolComment = () => {
  const [isCommentVisible, setCommentVisible] = useState(false);
  const [comment, setComment] = useState('');
  
  const handleToggleComment = () => {
    setCommentVisible(!isCommentVisible);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSaveComment = () => {
    // Envoyer le commentaire au serveur ici si nécessaire
    // Mettre à jour l'affichage du commentaire
    setCommentVisible(false); // Cacher le champ de commentaire après l'enregistrement
  };

  return (
    <div>
      <div>
        Note de l'école: {/* Afficher la note ici */}
      </div>
      {isCommentVisible ? (
        <div>
          <textarea
            rows="4"
            cols="50"
            placeholder="Saisissez votre commentaire..."
            value={comment}
            onChange={handleCommentChange}
          />
          <button onClick={handleSaveComment}>Enregistrer</button>
        </div>
      ) : (
        <button onClick={handleToggleComment}>Ajouter un commentaire</button>
      )}
      {comment && (
        <div>
          <p>Commentaire: {comment}</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      )}
    </div>
  );
};

export default SchoolComment;
