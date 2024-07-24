import { User } from '@/components/constants/interfaces';
import { create } from 'zustand';

const initialUser: User = {
  id: '026a94d6-89d7-4d40-8083-2b6a5f9ed783',
  name: 'Actualmente',
  lastName: 'Pandatastico',
  email: 'actuallypanda@gmail.com',
  phoneNumber: '1234567890',
  identification: '',
  birthDate: '',
  profilePicture: '',
  address: '',
  isRestaurantOwner: true,
};

export const userStore = create((set) => ({
  user: initialUser,
  setUser: (user: User) => set({ user }),
  updateUser: (user: Partial<User>) =>
    set((state: any) => ({ user: { ...state.user, ...user } })),
  clearUser: () => set({ user: initialUser }),
}));
