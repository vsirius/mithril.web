import React from 'react';

import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from 'containers/layouts/App';
import Main from 'containers/layouts/Main';

import RolesPage from 'containers/pages/RolesPage';
import CreateRolePage from 'containers/pages/CreateRolePage';
import UpdateRolePage from 'containers/pages/UpdateRolePage';
import NotFoundPage from 'containers/pages/NotFoundPage';

export const configureRoutes = ({ store }) => { // eslint-disable-line
  return (
    <Route component={App}>
      <Route component={Main}>
        <Route path="/">
          <IndexRedirect to="/roles" />

          <Route path="roles">
            <IndexRoute component={RolesPage} />
            <Route path="create" component={CreateRolePage} />
            <Route path=":id" component={UpdateRolePage} />
          </Route>

          <Route path="*" component={NotFoundPage} />
        </Route>
      </Route>
    </Route>
  );
};
