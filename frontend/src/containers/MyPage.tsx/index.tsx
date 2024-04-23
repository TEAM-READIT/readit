import Headers from '../../components/Headers';
import Stats from './Stats';
import MyPageHeaders from './MypageHeaders';

const MyPage = () => {
	return (
		<>
			<div className='w-full flex flex-col items-center'>
				<Headers />
				<div className='w-3/4'>
					<MyPageHeaders />
					<Stats />
				</div>
			</div>
		</>
	);
};

export default MyPage;
