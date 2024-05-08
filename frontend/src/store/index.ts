import { create } from 'zustand';
import RootState from '../types/storeProps';



const useStore = create<RootState>((set) => ({
	modal: false,
	setModal: (modal) => set({ modal }),
}));

export default useStore;
