import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import { H1 } from 'components/Title';
import Table from 'components/Table';
import Button from 'components/Button';

import { getRoles } from 'reducers';
import { fetchRoles } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchRoles()),
})
@connect(state => ({
  roles: getRoles(state, state.pages.RolesPage.roles),
}))
export default class RolesPage extends React.Component {
  render() {
    const { roles = [], t } = this.props;

    return (
      <div id="roles-page">
        <H1>{ t('Roles') }</H1>
        <div id="roles-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: t('Id') },
              { key: 'name', title: t('Name') },
              { key: 'scope', title: t('Scope') },
              { key: 'edit', title: t('Edit') },
            ]}
            data={roles.map(item => ({
              id: item.id,
              name: <div className={styles.name}>
                {item.name}
              </div>,
              scope: item.scope,
              edit: (<Button
                id={`edit-template-button-${item.id}`}
                theme="link"
                to={`/roles/${item.id}`}
              >
                { t('Edit role') }
              </Button>),
            }))}
          />
        </div>
        <div className={styles.block}>
          <Button to="/roles/create">{t('Create new')}</Button>
        </div>
      </div>
    );
  }
}
