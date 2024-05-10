import { create } from 'zustand';
import userProp from '../types/userProps';
import { persist } from 'zustand/middleware';

const useUserStore = create(
	persist<userProp>(
		(set) => ({
			email: '',
			setEmail: (email) => set({ email }),
			id: 0,
			setId: (id) => set({ id }),
			name: '',
			setName: (name) => set({ name }),
			profileImageUrl: '',
			setProfileImageUrl: (profileImageUrl) => set({ profileImageUrl }),
		}),
		{
			name: 'user-storage', // 로컬 스토리지 키
		},
	),
);

export default useUserStore;