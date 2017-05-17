import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field, getFormValues } from 'redux-form';
import { reduxFormValidate } from 'react-nebo15-validate';

import Form, { FormRow, FormBlock, FormButtons, FormColumn } from 'components/Form';
import FieldInput from 'components/reduxForm/FieldInput';
import Button, { ButtonsGroup } from 'components/Button';
import ConfirmFormChanges from 'containers/blocks/ConfirmFormChanges';
import { CheckboxGroup } from 'components/reduxForm/FieldCheckboxGroup';

import styles from './styles.scss';

const getValues = getFormValues('role-form');

@translate()
@withStyles(styles)
@reduxForm({
  form: 'role-form',
  validate: reduxFormValidate({
    name: {
      required: true,
    },
  }),
  initialValues: {
    scope: '',
  },
})
@connect(state => ({
  values: getValues(state),
}))
export default class RoleForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.state = {
      savedValues: props.initialValues,
    };
  }
  onSubmit(values, ...args) {
    if (typeof this.props.onSubmit !== 'function') {
      this.setState({
        savedValues: values,
      });
      return true;
    }
    const submitRes = this.props.onSubmit(values, ...args);
    if (typeof submitRes !== 'function') {
      this.setState({
        savedValues: values,
      });
      return submitRes;
    }

    submitRes.then((action) => {
      if (action.error) return action;
      this.setState({
        savedValues: values,
      });
      return submitRes;
    });

    return submitRes;
  }
  onDelete() {
    return this.props.onDelete(this.state.savedValues.id);
  }
  get isChanged() {
    const { values = [] } = this.props;
    return JSON.stringify(values) !== JSON.stringify(this.state.savedValues);
  }
  render() {
    const { handleSubmit, submitting, edit, t } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <FormBlock>
          <FormRow>
            <FormColumn>
              <Field
                name="name"
                component={FieldInput}
                labelText={t('Role name')}
                placeholder={t('Role name')}
              />
            </FormColumn>
            <FormColumn />
          </FormRow>
          <FormRow>
            <FormColumn>
              <div className={styles.row}>{t('Choose roles')}</div>
              <CheckboxGroup
                name="scope"
                options={[
                  { label: t('app:authorize'), value: 'app:authorize' },
                  { label: t('some_api:read'), value: 'some_api:read' },
                  { label: t('some_api:write'), value: 'some_api:write' },
                  { label: t('legal_entity:read'), value: 'legal_entity:read' },
                  { label: t('legal_entity:write'), value: 'legal_entity:write' },
                  { label: t('employee_request:write'), value: 'employee_request:write' },
                ]}
                format={value => value.split(' ')}
                normalize={value => value.join(' ')}
              />
            </FormColumn>
          </FormRow>
        </FormBlock>
        <FormButtons>
          {
            edit && (<ButtonsGroup>
              <Button type="submit" disabled={!this.isChanged}>{
                submitting ? t('Saving...') : (this.isChanged ? t('Update Role') : t('Saved'))
              }</Button>
              <Button color="red" onClick={this.onDelete}>{submitting ? t('Deleting...') : t('Delete Role')
              }</Button>
            </ButtonsGroup>)
          }
          {
            !edit && (<ButtonsGroup>
              <Button type="submit" disabled={!this.isChanged}>{
                submitting ? t('Saving...') : (this.isChanged ? t('Save New Role') : t('Saved'))
              }</Button>
            </ButtonsGroup>)
          }
        </FormButtons>
        <ConfirmFormChanges submitting={submitting} isChanged={this.isChanged} />
      </Form>
    );
  }
}

