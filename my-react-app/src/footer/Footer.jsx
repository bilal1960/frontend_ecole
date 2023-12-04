import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';


function Footer() {
  const { t } = useTranslation();

  return (
    <div>
    <div  className="footer">

      <p>{t("School Management version 1.0 all rights reserved barbé Bilal")}</p>
     
    </div>
    </div>
  );
}

export default Footer;
