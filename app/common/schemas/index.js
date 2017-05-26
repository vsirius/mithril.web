import { schema } from 'normalizr';

export const role = new schema.Entity('roles');
export const userRole = new schema.Entity('userRoles');
export const user = new schema.Entity('users');
export const client = new schema.Entity('clients');

export const clientType = new schema.Entity('clientTypes');
export const token = new schema.Entity('tokens');
