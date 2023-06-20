import React, { useState } from 'react';

function MessageSender() {
    const[message,setMessage] = useState('');

    function handleChange(event){
       setMessage(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:5173/logmessage',{
            headers: {
                'Content-type': 'application/json'
            },
            method: 'Post',
            body: JSON.stringify({message: message})
        });
      
    }


    return (
        <form onSubmit={handleSubmit}>
            <p>
                <label>Message</label>
                <input type="text" name="message" id="message" value={message} onChange={handleChange} />
            </p>
            <p>
                <input type="submit" value="envoyer" />
            </p>
        </form>
    );
}

export default MessageSender;
