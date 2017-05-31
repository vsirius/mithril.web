import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { normalize } from 'normalizr';
import { approval } from 'schemas';
import { createUrl } from 'helpers/url';
import { invoke } from './api';

export const fetchApprovals = options => invoke({
  endpoint: createUrl(`${API_URL}/admin/apps`, options),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['apps/FETCH_APPROVALS_REQUEST', {
    type: 'apps/FETCH_APPROVALS_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, [approval])
    ),
  }, 'apps/FETCH_APPROVALS_FAILURE'],
});

export const fetchApprovalByID = id => invoke({
  endpoint: `${API_URL}/admin/apps/${id}`,
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['apps/FETCH_APPROVAL_BY_ID_REQUEST', {
    type: 'apps/FETCH_APPROVAL_BY_ID_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, approval)
    ),
  }, 'apps/FETCH_APPROVAL_BY_ID_FAILURE'],
});

export const createApproval = body => invoke({
  endpoint: `${API_URL}/admin/apps`,
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  types: ['apps/CREATE_APPROVAL_REQUEST', {
    type: 'apps/CREATE_APPROVAL_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, approval)
    ),
  }, 'apps/CREATE_APPROVAL_FAILURE'],
  body: {
    app: {
      ...body,
    },
  },
});

export const updateApproval = (id, body) => invoke({
  endpoint: `${API_URL}/admin/apps/${id}`,
  method: 'PATCH',
  headers: {
    'content-type': 'application/json',
  },
  types: ['apps/UPDATE_APPROVAL_REQUEST', {
    type: 'apps/UPDATE_APPROVAL_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, approval)
    ),
  }, 'apps/UPDATE_APPROVAL_FAILURE'],
  body: {
    app: {
      ...body,
    },
  },
});

export const deleteApproval = id => invoke({
  endpoint: `${API_URL}/admin/apps/${id}`,
  method: 'DELETE',
  headers: {
    'content-type': 'application/json',
  },
  types: ['apps/DELETE_APPROVAL_REQUEST',
    'apps/DELETE_APPROVAL_SUCCESS',
    'apps/DELETE_APPROVAL_FAILURE'],
});

export default handleAction(
  combineActions(
    'apps/FETCH_APPROVALS_SUCCESS',
    'apps/FETCH_APPROVAL_BY_ID_SUCCESS',
    'apps/CREATE_APPROVAL_SUCCESS',
    'apps/UPDATE_APPROVAL_SUCCESS'
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.approvals,
  }),
  {}
);