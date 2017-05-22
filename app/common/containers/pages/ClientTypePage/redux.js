import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromClientTypes from 'redux/client-types';

export const getClientTypes = createAction('clientTypesPage/GET_CLIENT_TYPES');

export const fetchClientsTypes = () => dispatch =>
  dispatch(fromClientTypes.fetchClientsTypes())
  .then((action) => {
    if (action.error) throw action;
    return dispatch(getClientTypes(action.payload.result));
  });

const clientTypes = handleAction(getClientTypes, (state, action) => action.payload, []);

export default combineReducers({
  clientTypes,
});
