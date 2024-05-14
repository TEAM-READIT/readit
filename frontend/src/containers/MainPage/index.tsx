import { useEffect } from 'react';
import Headers from '../../components/Headers';
import Carousels from './Carousels';
import Cards from './Cards';
import useStore from '../../store';

const IndexPage = () => {
	const { modal } = useStore();


	useEffect(() => {
		if (modal) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}

	}, [modal]);

	return (
		<>
			<div className='w-full flex justify-center flex-col items-center pr-10'>
				<Headers />
				<div className='w-3/5 pt-5'>
					<Carousels />
					<Cards />
				</div>
			</div>
		</>
	);
};

export default IndexPage;
