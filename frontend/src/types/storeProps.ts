interface RootState {
	modal: boolean;
	setModal: (modal: boolean) => void;
	lastfilter: string;
	setLastfilter:(lastfilter:string) => void 
}

export default RootState