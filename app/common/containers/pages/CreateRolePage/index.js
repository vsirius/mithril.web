import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import RoleForm from 'containers/forms/RoleForm';

import { onCreateRole } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@connect(null, ({ onCreateRole }))
export default class CreateRolePage extends React.Component {
  render() {
    const { onCreateRole, t } = this.props;

    return (
      <FormPageWrapper id="create-roles-page" title={t('Create role')} back="/roles">
        <RoleForm onSubmit={onCreateRole} />
      </FormPageWrapper>
    );
  }
}
