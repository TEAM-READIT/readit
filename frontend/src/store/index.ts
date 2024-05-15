import { create } from 'zustand';
import RootState from '../types/storeProps';

const useStore = create<RootState>((set) => ({
	modal: false,
	setModal: (modal) => set({ modal }),
	lastfilter: '',
	setLastfilter: (lastfilter) => set({ lastfilter }),
	communityfilter: '',
	setCommunityfilter: (communityfilter) => set({ communityfilter }),
}));

export default useStore;
