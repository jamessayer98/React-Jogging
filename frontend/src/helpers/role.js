import { Roles } from '../constants';

export const isUserManageAllowed = (role) => role >= Roles.MANAGER;

export const isAdmin = (role) => role === Roles.ADMIN;