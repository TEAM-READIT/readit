import { create } from 'zustand';
import userProp from '../types/userProps';



const useStore = create<userProp>((set) => ({
	email: '',
	setEmail: (email: string) => set({ email }),
	id: 0,
	setId: (id: number) => set({ id }),
	name: '',
	setName: (name: string) => set({ name }),
	profileImageUrl: '',
	setProfileImageUrl: (profileImageUrl: string) => set({ profileImageUrl }),
}));

export default useStore;
