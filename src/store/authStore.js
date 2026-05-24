import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null }),
      isAuthenticated: false,
      setIsAuthenticated: (status) => set({ isAuthenticated: status }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
