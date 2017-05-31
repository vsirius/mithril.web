import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromApprovals from 'redux/approvals';

export const getApprovals = createAction('approvalsPage/GET_APPROVALS');

export const fetchApprovals = () => dispatch =>
  dispatch(fromApprovals.fetchApprovals())
  .then((action) => {
    if (action.error) throw action;
    return dispatch(getApprovals(action.payload.result));
  });

const approvals = handleAction(getApprovals, (state, action) => action.payload, []);

export default combineReducers({
  approvals,
});
