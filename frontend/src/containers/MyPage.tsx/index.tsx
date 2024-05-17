import Headers from '../../components/Headers';
import Stats from './Stats';
import MyPageHeaders from './MypageHeaders';
import useStore from '../../store';
import { useEffect } from 'react';

const MyPage = () => {
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
			<div className='w-full flex flex-col items-center pb-32 pr-5 select-none'>
				<Headers />
				<div className='w-3/5'>
					<MyPageHeaders />
					<Stats />
				</div>
			</div>
		</>
	);
};

export default MyPage;
