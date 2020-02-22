import { Roles } from '../constants';

export const isUserManageAllowed = (role) => role >= Roles.MANAGER;

export const isAdmin = (role) => role === Roles.ADMIN;

export const getRoleName = (role) => {
  for (let key in Roles) {
    if (Roles[key] === role) return key.toLowerCase();
  }
  return 'Invalid role';
}

export const getAvailableRoles = (role) => {
  const availableRoles = {};

  Object.keys(Roles).forEach((roleName) => {
    if (Roles[roleName] <= role) availableRoles[roleName] = Roles[roleName];
  });

  return availableRoles;
}