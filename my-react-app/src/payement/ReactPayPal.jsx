import React from 'react';
import emailjs from 'emailjs-com';

// Assurez-vous de remplacer 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', et 'YOUR_USER_ID'
// avec les valeurs réelles fournies par EmailJS.
const SERVICE_ID = 'service_okssxjr';
const TEMPLATE_ID = 'template_vdmyx4e';
const USER_ID = 'QqdfUtDMtJus6pH4c';

export default function ReactPayPal() {
  const [paid, setPaid] = React.useState(false);
  const [error, setError] = React.useState(null);
  const paypalRef = React.useRef();

  // Cette fonction envoie un e-mail de confirmation
  const sendEmail = (order) => {
    // Préparez les variables pour le modèle d'e-mail
    const templateParams = {
      app_name: 'Gestion école',
      transaction_id: order.id, 
      order_id: order.id,
      order_amount: order.purchase_units[0].amount.value,
      order_currency: order.purchase_units[0].amount.currency_code,
      // Vous pouvez ajouter plus de détails ici selon votre modèle d'e-mail
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then(response => {
        console.log('Email successfully sent!', response);
      })
      .catch(err => {
        console.error('Failed to send email. Error: ', err);
      });
  };

  React.useEffect(() => {
    if (window.paypal && !paypalRef.current.firstChild) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [{
              description: 'Your description',
              amount: {
                currency_code: 'EUR',
                value: '500.00', // Remarquez que la valeur est une chaîne
              },
            }],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaid(true);
          console.log(order);
          sendEmail(order); // Envoyez l'e-mail après la capture de la commande
        },
        onError: (err) => {
          setError(err);
          console.error(err);
        },
      }).render(paypalRef.current);
    }
  }, []);

  // Si le paiement a été effectué
  if (paid) {
    return <div>Payment successful!</div>;
  }

  // En cas d'erreur
  if (error) {
    return <div>Error Occurred in processing payment! Please try again.</div>;
  }

  // Rendu par défaut
  return (
    <div>
      <h4>Acheter l'application</h4>
      <div ref={paypalRef} />
    </div>
  );
}
