import { push } from 'react-router-redux';
import * as fromRoles from 'redux/roles';

export const onCreateRole = body => dispatch =>
  dispatch(fromRoles.createRole(body))
    .then((action) => {
      if (action.error) throw action;
      return dispatch(push(`/roles/${action.payload.result}`));
    });
