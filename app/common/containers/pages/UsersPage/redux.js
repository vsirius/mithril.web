import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromUsers from 'redux/users';

export const getUsers = createAction('mainPage/GET_USERS_LIST');

export const fetchUsersList = () => dispatch =>
  dispatch(fromUsers.fetchUsersList())
  .then((action) => {
    if (action.error) throw action;
    dispatch(getUsers(action.payload.result));
    return action;
  });

const users = handleAction(getUsers, (state, action) => action.payload, []);

export default combineReducers({
  users,
});
