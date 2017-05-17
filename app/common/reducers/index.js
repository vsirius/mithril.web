import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import { denormalize } from 'normalizr';
import * as schemas from 'schemas';

import loading from 'redux/loading';
import roles from 'redux/roles';

import Aside from 'containers/blocks/Aside/redux';

import RolesPage from 'containers/pages/RolesPage/redux';

const blocks = combineReducers({
  Aside,
});

const pages = combineReducers({
  RolesPage,
});

const data = combineReducers({
  roles,
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
