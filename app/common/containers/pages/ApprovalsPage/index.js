import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import { H1 } from '@components/Title';
import Table from '@components/Table';
import Button from '@components/Button';

import { getApprovals } from 'reducers';
import { fetchApprovals } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchApprovals()),
})
@connect(state => ({
  approvals: getApprovals(state, state.pages.ApprovalsPage.approvals),
}))
export default class ApprovalsPage extends React.Component {
  render() {
    const { approvals = [], t } = this.props;

    return (
      <div id="approvals-page">
        <Helmet title={t('Approvals')} />
        <H1>{ t('Approvals') }</H1>
        <div id="roles-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: t('Id') },
              { key: 'scope', title: t('Scope') },
              { key: 'action', title: t('Action') },
            ]}
            data={approvals.map(item => ({
              id: item.id,
              scope: item.scope,
              action: (<Button
                id={`edit-approval-button-${item.id}`}
                theme="link"
                to={`/approvals/${item.id}`}
              >
                { t('Edit approval') }
              </Button>),
            }))}
          />
        </div>
        <div className={styles.block}>
          <Button to="/approvals/create">{t('Create new approval')}</Button>
        </div>
      </div>
    );
  }
}
