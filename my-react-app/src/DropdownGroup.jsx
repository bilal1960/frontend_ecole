import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import PermissionGuard from './PermissionGuard';

function DropdownGroup({ activeMenu, onMenuChange }) {
  const { t } = useTranslation();

  const handleSelect = (eventKey) => {
    onMenuChange(eventKey);
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="success" id="dropdown-group">
        {t('groupMenu')}
      </Dropdown.Toggle>
      <Dropdown.Menu>
      <PermissionGuard permission="read:matiere">
        <Dropdown.Item eventKey="ListMatiere">{t('subjectList')}</Dropdown.Item>
        </PermissionGuard>
        <PermissionGuard permission="read:inscrit">
        <Dropdown.Item eventKey="Listinscription">{t('registrationList')}</Dropdown.Item>
        </PermissionGuard>
        <PermissionGuard permission="read:personne">
        <Dropdown.Item eventKey="ListPersonne">{t('personList')}</Dropdown.Item>
        </PermissionGuard>
        <PermissionGuard permission="read:presence">
        <Dropdown.Item eventKey="ListAbsence">{t('absenceList')}</Dropdown.Item>
        </PermissionGuard>
        <PermissionGuard permission="read:vacance">
        <Dropdown.Item eventKey="ListVacance">{t('List of Vacations')}</Dropdown.Item>
        </PermissionGuard>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownGroup;
