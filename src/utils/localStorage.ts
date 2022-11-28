import { IUser } from '../types/user.interface';

export const addUserToLocalStorage = (user: IUser) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserToLocalStorage = () => {
  localStorage.removeItem('user');
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('user');
  const user = result ? JSON.parse(result) : null;
  return user;
};
