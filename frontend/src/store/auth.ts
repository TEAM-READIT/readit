import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthProps {
	isLoggedIn: boolean;
	accessToken: string;
	login: (accessToken: string) => void;
	logout: () => void;
}

export const useAuthStore = create(
	persist<AuthProps>(
		(set) => ({
			isLoggedIn: false,
			accessToken: '',
			login: (accessToken: string) => set({ isLoggedIn: true, accessToken }),
			logout: () => set({ isLoggedIn: false, accessToken: '' }),
		}),
		{
			name: 'auth-storage',
		},
	),
);
