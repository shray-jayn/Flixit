import { atom } from 'recoil';

interface User {
  id: string;
  email: string;
  username: string;
  profilePic?: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  accessToken: string;
}

export const userState = atom<User | null>({
  key: 'userState',
  default: JSON.parse(localStorage.getItem('user') || 'null'),
});
