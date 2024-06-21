import { User } from '@/components/constants/interfaces';
import {create} from 'zustand';

const initialUser: User = {
  id: '5ad66684-80c5-4d3e-943a-7f6d712c675c',
  name: 'Actually',
  lastName: 'Panda',
  email: 'actuallypanda@gmail.com',
  phoneNumber: '1234567890',
  identification: '1234567890',
  birthDate: '2021-01-01',
  password: '12345678',
  profilePicture: '',
  address: '1234 Elm St.',
  isRestaurantOwner: true
};

export const userStore = create((set) => ({
  user: initialUser,
  setUser: (user: User) => set({ user }),
  updateUser: (user: Partial<User>) => set((state: any) => ({ user: { ...state.user, ...user } })),
  clearUser: () => set({ user: initialUser }),
}))