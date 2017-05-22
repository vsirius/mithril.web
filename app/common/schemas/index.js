import { schema } from 'normalizr';

export const role = new schema.Entity('roles');
export const userRole = new schema.Entity('userRoles');
export const clientType = new schema.Entity('clientTypes');

export const token = new schema.Entity('tokens');
