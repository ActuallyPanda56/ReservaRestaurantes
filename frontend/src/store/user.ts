import { User } from '@/components/constants/interfaces';
import { create } from 'zustand';

const initialUser: User = {
  id: '',
  name: '',
  lastName: '',
  email: '',
  phoneNumber: '',
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
