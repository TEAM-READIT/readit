import { useCallback, useState } from 'react';

const useModal = (): [boolean, () => void, () => void] => {
	const [isOpen, setIsOpen] = useState(false);
	const open = useCallback(() => {
		setIsOpen(true);
	}, []);
	const close = useCallback(() => {
		setIsOpen(false);
	}, []);
	return [isOpen, open, close];
};

export default useModal;
