import React from 'react';
import withStyles from 'withStyles';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';

import { Select } from '@components/Select';

import styles from './styles.scss';

const SCOPES = [{ name: 'employee:read', title: 'employee:read' },
  { name: 'employee:write', title: 'employee:write' },
  { name: 'employee_request:approve', title: 'employee_request:approve' },
  { name: 'employee_request:read', title: 'employee_request:read' },
  { name: 'employee_request:write', title: 'employee_request:write' },
  { name: 'employee_request:reject', title: 'employee_request:reject' },
  { name: 'legal_entity:read', title: 'legal_entity:read' },
  { name: 'declaration_request:read', title: 'declaration_request:read' },
  { name: 'declaration_request:write', title: 'declaration_request:write' },
  { name: 'otp:write', title: 'otp:write' },
  { name: 'otp:read', title: 'otp:read' },
  { name: 'division:read', title: 'division:read' },
  { name: 'division:write', title: 'division:write' },
  { name: 'legal_entity:deactivate', title: 'legal_entity:deactivate' },
  { name: 'employee:deactivate', title: 'employee:deactivate' },
  { name: 'employee:write', title: 'employee:write' },
  { name: 'declaration:read', title: 'declaration:read' },
  { name: 'declaration_request:reject', title: 'declaration_request:reject' }];

@withStyles(styles)
@translate()
@reduxForm()
export default class FieldScopeFilterForm extends React.Component {

  state = {
    active: '',
  };

  render() {
    const { handleSubmit, t, name } = this.props;
    return (
      <form className={styles.main} onSubmit={handleSubmit}>
        <Field
          multiple
          allowAddItem
          searchable
          name={name}
          component={Select}
          labelText={t('Choose or enter scopes')}
          type="text"
          onChangeSearch={val => this.setState({ active: val })}
          options={SCOPES.filter(i => new RegExp(this.state.active).test(i.name) === true)}
          placeholder={t('Enter')}
        />
      </form>
    );
  }
}
