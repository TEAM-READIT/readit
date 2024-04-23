import { useEffect } from 'react';

import Headers from '../../components/Headers';
import Carousels from './Carousels';
import Cards from './Cards';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import useStore from '../../store';

const IndexPage = () => {
	const { modal } = useStore();
	const navigate = useNavigate();
	const { login, accessToken, logout } = useAuthStore();
	const searchParams = new URLSearchParams(window.location.search);
	console.log(searchParams);
	const code = searchParams.get('code');

	useEffect(() => {
		if (code) {
			login(code);
			navigate('/');
		}
	}, [code]);

	useEffect(() => {
		if (modal) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
		console.log(modal);
	}, [modal]);

	return (
		<>
			<div className='w-full flex justify-center flex-col items-center'>
				<Headers />
				<div className='w-3/4'>
					<Carousels />
					<Cards />
				</div>
			</div>
		</>
	);
};

export default IndexPage;
