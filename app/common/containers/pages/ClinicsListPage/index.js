import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import { H1 } from 'components/Title';
import Table from 'components/Table';
import Button from 'components/Button';
import YesNo from 'components/YesNo';

import { getClinics } from 'reducers';

import { fetchClinics } from './redux';
import styles from './styles.scss';

@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchClinics()),
})
@connect(state => ({
  ...state.pages.ClinicsListPage,
  clinics: getClinics(state, state.pages.ClinicsListPage.clinics),
}))
export default class ClinicsListPage extends React.Component {
  render() {
    const { clinics = [], t } = this.props;

    return (
      <div id="clinics-list-page">
        <H1>{ t('Clinics') }</H1>
        <p>{ t('Select dictionary to edit') }</p>
        <div id="clinics-table" className={styles.table}>
          <Table
            columns={[
              { key: 'name', title: t('Name') },
              { key: 'type', title: t('Type') },
              { key: 'status', title: t('Status') },
              { key: 'active', title: t('Active'), width: 100 },
              { key: 'action', title: t('Action'), width: 100 },
            ]}
            data={clinics.map(i => ({
              name: <div className={styles.name}>
                {i.name}
                <p>{i.legal_form}</p>
              </div>,
              status: i.status,
              type: i.type,
              active: <YesNo bool={i.active} />,
              action: (<Button id={`show-clinic-detail-button-${i.name}`} theme="link" to={`/clinics/${i.id}`}>{ t('Details') }</Button>),
            }))}
          />
        </div>
      </div>
    );
  }
}