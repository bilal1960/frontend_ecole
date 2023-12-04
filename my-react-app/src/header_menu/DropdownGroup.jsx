import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import PermissionGuard from '../permission/PermissionGuard';
import { NavLink } from 'react-router-dom';


function DropdownGroup({ activeMenu, onMenuChange }) {
  const { t } = useTranslation();

  const handleSelect = (eventKey) => {
    onMenuChange(eventKey);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-group">
        {t('Group Menu')}
      </Dropdown.Toggle>
      <Dropdown.Menu>
      <PermissionGuard permission="read:matiere">
        <Dropdown.Item as= {NavLink} to="/matières">{t('subjectList')}</Dropdown.Item>
        </PermissionGuard>
        <PermissionGuard permission="read:inscrit">
        <Dropdown.Item as={NavLink} to="/inscriptions">{t('registrationList')}</Dropdown.Item>
        </PermissionGuard>
        <PermissionGuard permission="read:personne">
        <Dropdown.Item as={NavLink} to="/personnes">{t('personList')}</Dropdown.Item>
        </PermissionGuard>
        <PermissionGuard permission="read:presence">
        <Dropdown.Item as={NavLink} to= "/absences">{t('absenceList')}</Dropdown.Item>
        </PermissionGuard>
        <PermissionGuard permission="read:vacance">
        <Dropdown.Item as={NavLink}to="/vacances">{t('List of Vacations')}</Dropdown.Item>
        </PermissionGuard>
        <PermissionGuard permission="read:personne">
        <Dropdown.Item as={NavLink}to="/notes">{t("List of note")}</Dropdown.Item>
        </PermissionGuard>
        <PermissionGuard permission="read:cours">
        <Dropdown.Item as={NavLink}to="/teachermatiere">teacherMatiere</Dropdown.Item>
         </PermissionGuard>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownGroup;
