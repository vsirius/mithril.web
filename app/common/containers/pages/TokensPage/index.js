import React from 'react';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { format } from 'helpers/date';

import { H1 } from '@components/Title';
import Table from '@components/Table';
import Button from '@components/Button';
import { Select } from '@components/Select';
import Pagination from 'components/CursorPagination';

import { getTokens } from 'reducers';
import { fetchTokens } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchTokens(query)),
})
@connect(state => ({
  ...state.pages.TokensPage,
  tokens: getTokens(state, state.pages.TokensPage.tokens),
}))
export default class TokensPage extends React.Component {
  filterTokens(filter) {
    const newFilter = {
      ...this.props.location.query,
      ...filter,
    };

    const query = Object.keys(newFilter).reduce((target, key) => {
      if (newFilter[key]) {
        target[key] = newFilter[key]; // eslint-disable-line
      }

      return target;
    }, { });

    this.props.router.push({
      ...this.props.location,
      query,
    });
  }

  render() {
    const { tokens = [], t, location, paging } = this.props;

    return (
      <div id="tokens-page">
        <Helmet title={t('Tokens')} />
        <H1>{ t('Tokens') }</H1>
        <div className={styles.filter}>
          <div>
            <Select
              placeholder={t('Filter by name')}
              options={[
                { title: t('All'), name: null },
                { title: t('refresh_token'), name: 'refresh_token' },
                { title: t('access_token'), name: 'access_token' },
              ]}
              onChange={name => this.filterTokens({ name })}
            />
          </div>
        </div>
        <div id="tokens-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: t('Id') },
              { key: 'name', title: t('Name') },
              { key: 'value', title: t('Value') },
              { key: 'scope', title: t('Expires_at') },
              { key: 'details', title: t('Action') },
            ]}
            data={tokens.map(item => ({
              id: item.id,
              name: <div className={styles.name}>
                {item.name}
              </div>,
              value: <div className={styles.name}>
                {item.value}
              </div>,
              scope: <div>
                { format(item.expires_at * 1000, 'DD.MM.YYYY HH:MM') }
              </div>,
              details: (<Button
                id={`token-details-button-${item.id}`}
                theme="link"
                to={`/tokens/${item.id}`}
              >
                { t('Show token details') }
              </Button>),
            }))}
          />
        </div>
        <div className={styles.block}>
          <Button to="/tokens/create">{t('Create new token')}</Button>
        </div>

        <div className={styles.pagination}>
          <Pagination
            location={location}
            more={paging.has_more}
            after={paging.cursors.starting_after}
            before={paging.cursors.ending_before}
          />
        </div>

      </div>
    );
  }
}
