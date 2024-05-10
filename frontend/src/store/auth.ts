import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useUserStore from './user';

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
			logout: () => {
				set({ isLoggedIn: false, accessToken: '' });
				// 사용자 정보 상태 초기화
				useUserStore.getState().setEmail('');
				useUserStore.getState().setId(0);
				useUserStore.getState().setName('');
				useUserStore.getState().setProfileImageUrl('');
			},
		}),
		{
			name: 'auth-storage',
		},
	),
);
