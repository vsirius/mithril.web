import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import { denormalize } from 'normalizr';
import * as schemas from 'schemas';

import loading from 'redux/loading';

import roles from 'redux/roles';
import clientTypes from 'redux/client-types';
import tokens from 'redux/tokens';

import Aside from 'containers/blocks/Aside/redux';

import RolesPage from 'containers/pages/RolesPage/redux';
import ClientTypePage from 'containers/pages/ClientTypePage/redux';
import TokensPage from 'containers/pages/TokensPage/redux';

const blocks = combineReducers({
  Aside,
});

const pages = combineReducers({
  RolesPage,
  ClientTypePage,
  TokensPage,
});

const data = combineReducers({
  roles,
  clientTypes,
  tokens,
});

export default combineReducers({
  blocks,
  pages,
  data,
  // external libraries
  form,
  routing,
  loading,
});

export const getLocation = state => state.routing.locationBeforeTransitions;
export const getForm = (state, formName) => state.form[formName];

export const getRoles = (state, ids) => denormalize(ids, [schemas.role], state.data);
export const getRole = (state, id) => denormalize(id, schemas.role, state.data);

export const getClientTypes = (state, ids) => denormalize(ids, [schemas.clientType], state.data);
export const getClientType = (state, id) => denormalize(id, schemas.clientType, state.data);

export const getTokens = (state, ids) => denormalize(ids, [schemas.token], state.data);
export const getToken = (state, id) => denormalize(id, schemas.token, state.data);
