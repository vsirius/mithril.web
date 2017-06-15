import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import { H1 } from '@components/Title';
import Table from '@components/Table';
import Button from '@components/Button';

import { getUsers } from 'reducers';
import { fetchUsersList } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchUsersList()),
})
@connect(state => ({
  users: getUsers(state, state.pages.UsersPage.users),
}))
export default class UsersPage extends React.Component {
  render() {
    const { users = [], t } = this.props;
    return (
      <div id="users-page">
        <Helmet title={t('Users')} />
        <H1>{ t('Users') }</H1>
        <div id="users-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: t('Id') },
              { key: 'email', title: t('Email') },
              { key: 'actions', title: t('Details') },
            ]}
            data={users.map(item => ({
              id: item.id,
              email: <div className={styles.name}>
                {item.email}
              </div>,
              actions: (<Button
                id={`user-details-button-${item.id}`}
                theme="link"
                to={`/users/${item.id}`}
              >
                { t('Show user details') }
              </Button>),
            }))}
          />
        </div>
        <div className={styles.block}>
          <Button to="/users/create">{t('Create new user')}</Button>
        </div>
      </div>
    );
  }
}
