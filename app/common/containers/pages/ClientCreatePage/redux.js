import { push } from 'react-router-redux';
import * as fromClients from 'redux/clients';

export const onCreateClient = body => dispatch =>
  dispatch(fromClients.createClient(body))
    .then((action) => {
      if (action.error) throw new Error();
      return dispatch(push(`/clients/${action.payload.result}`));
    });
