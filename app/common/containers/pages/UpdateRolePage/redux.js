import { combineReducers } from 'redux';
import { push } from 'react-router-redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromRoles from 'redux/roles';

export const getRoles = createAction('editRolePage/GET_ROLES');
export const updateRoles = createAction('editRolePage/UPDATE_ROLES');

export const deleteRole = id => dispatch =>
  dispatch(fromRoles.deleteRole(id))
    .then((action) => {
      if (action.error) throw action;
      return dispatch(push('/roles'));
    });

const roles = handleAction(getRoles, (state, action) => action.payload, []);
const updatedRoles = handleAction(updateRoles, (state, action) => action.payload, []);

export default combineReducers({
  roles,
  updatedRoles,
});
