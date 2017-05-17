import { combineReducers } from 'redux';
import { push } from 'react-router-redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromRoles from 'redux/roles';

export const createRole = createAction('roles/CREATE_ROLE');

export const onCreateRole = body => dispatch =>
  dispatch(fromRoles.createRole(body))
    .then((action) => {
      if (action.error) throw action;
      return Promise.all([
        dispatch(createRole(action.payload.result)),
        dispatch(push(`/roles/${action.payload.result}`)),
      ]);
    });

const newRole = handleAction(createRole, (state, action) => action.payload, []);

export default combineReducers({
  newRole,
});
