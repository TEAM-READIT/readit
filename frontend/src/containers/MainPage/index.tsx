import { useEffect } from 'react';

import Headers from '../../components/Headers';
import Carousels from './Carousels';
import Cards from './Cards';
// import { useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../../store/auth';
import useStore from '../../store';

const IndexPage = () => {
	const { modal } = useStore();
	// const navigate = useNavigate();
	// const { login, accessToken, logout } = useAuthStore();
	// const searchParams = new URLSearchParams(window.location.search);
	// const code = searchParams.get('code');

	// useEffect(() => {
	// 	if (code) {
	// 		login(code);
	// 		navigate('/');
	// 	}
	// }, [code]);

	useEffect(() => {
		if (modal) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}

	}, [modal]);

	return (
		<>
			<div className='w-full flex justify-center flex-col items-center'>
				<Headers />
				<div className='w-3/5 pt-10'>
					<Carousels />
					<Cards />
				</div>
			</div>
		</>
	);
};

export default IndexPage;
