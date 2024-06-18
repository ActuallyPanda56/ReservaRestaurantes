import { User } from '@/components/constants/interfaces';
import {create} from 'zustand';

const initialUser: User = {
  name: 'Actually',
  lastName: 'Panda',
  email: 'actuallypanda@gmail.com',
  phoneNumber: '1234567890',
  identification: '1234567890',
  birthDate: '2021-01-01',
  password: '12345678',
  profilePicture: '',
  address: '1234 Elm St.',
};

export const userStore = create((set) => ({
  user: initialUser,
  setUser: (user: User) => set({ user }),
  updateUser: (user: Partial<User>) => set((state: any) => ({ user: { ...state.user, ...user } })),
  clearUser: () => set({ user: initialUser }),
}))