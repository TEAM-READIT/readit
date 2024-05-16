import { useEffect } from 'react';
import Headers from '../../components/Headers';
import Carousels from './Carousels';
import Cards from './Cards';
import useStore from '../../store';
import Login from './Login/Login';
import useModal from '../../hooks/useModal';

const IndexPage = () => {
	const { modal } = useStore();
	const [isOpen, open, close] = useModal();

	useEffect(() => {
		if (modal) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [modal]);

	return (
		<>
			<div className='w-full flex justify-center flex-col items-center pr-5'>
				<Headers />
				<div className='w-3/5 pt-5'>
					<Carousels />
					<Cards open={open} />
				</div>
			</div>
			{isOpen ? <Login close={close} /> : null}
		</>
	);
};

export default IndexPage;
