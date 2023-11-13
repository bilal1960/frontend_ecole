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

  const sendEmail = (order) => {

    const templateParams = {
      app_name: 'Gestion école',
      transaction_id: order.id, 
      order_id: order.id,
      order_amount: order.purchase_units[0].amount.value,
      order_currency: order.purchase_units[0].amount.currency_code,
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
                value: '500.00', 
              },
            }],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaid(true);
          console.log(order);
          sendEmail(order); 
        },
        onError: (err) => {
          setError(err);
          console.error(err);
        },
      }).render(paypalRef.current);
    }
  }, []);


  if (paid) {
    return <div>Payment successful!</div>;
  }

  if (error) {
    return <div>Error Occurred in processing payment! Please try again.</div>;
  }

  
  return (
    <div>
      <h4>Acheter l'application</h4>
      <div ref={paypalRef} />
    </div>
  );
}
