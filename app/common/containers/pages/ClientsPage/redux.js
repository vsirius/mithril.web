import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromClients from 'redux/clients';

export const getClients = createAction('clientsPage/GET_CLIENTS');

export const fetchClients = () => dispatch =>
  dispatch(fromClients.fetchClients())
  .then((action) => {
    if (action.error) throw action;
    return dispatch(getClients(action.payload.result));
  });

const clients = handleAction(getClients, (state, action) => action.payload, []);

export default combineReducers({
  clients,
});
