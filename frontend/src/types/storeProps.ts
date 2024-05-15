interface RootState {
	modal: boolean;
	setModal: (modal: boolean) => void;
	lastfilter: string;
	setLastfilter: (lastfilter: string) => void;
	communityfilter: string;
	setCommunityfilter: (communityfilter: string) => void;
}

export default RootState