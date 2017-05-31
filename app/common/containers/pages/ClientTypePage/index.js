import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import { H1 } from 'components/Title';
import Table from 'components/Table';
import Button from 'components/Button';

import { getClientTypes } from 'reducers';
import { fetchClientsTypes } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchClientsTypes()),
})
@connect(state => ({
  clientTypes: getClientTypes(state, state.pages.ClientTypePage.clientTypes),
}))
export default class ClientTypePage extends React.Component {
  render() {
    const { clientTypes = [], t } = this.props;

    return (
      <div id="client-types-page">
        <Helmet title={t('Client Types')} />
        <H1>{ t('Client Types') }</H1>
        <div id="client-types-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: t('Id') },
              { key: 'name', title: t('Name') },
              { key: 'scope', title: t('Scope') },
              { key: 'edit', title: t('Action') },
            ]}
            data={clientTypes.map(item => ({
              id: item.id,
              name: <div className={styles.name}>
                {item.name}
              </div>,
              scope: item.scope,
              edit: (<Button
                id={`edit-client-type-button-${item.id}`}
                theme="link"
                to={`/client_types/${item.id}`}
              >
                { t('Edit client type') }
              </Button>),
            }))}
          />
        </div>
        <div className={styles.block}>
          <Button to="/client_types/create">{t('Create new client type')}</Button>
        </div>
      </div>
    );
  }
}
