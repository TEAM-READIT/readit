import { useLocation } from 'react-router-dom';
import Headers from '../../../components/Headers';
import GroupDetailHeaders from './GroupDetailHeaders';
import SearchFilter from './SearchFilter';
import SearchList from './SearchList';

const ReadDetail = () => {
	const location = useLocation();
	const communityList = location.state?.communityList
	return (
		<>
			<div className='w-full h-full flex justify-center flex-col items-center'>
				<Headers />
				<div className='flex flex-col w-full justify-start items-center '>
					<GroupDetailHeaders />
				</div>
				<div className='flex flex-row w-full justify-start gap-20 h-auto'>
					<div className='h-auto w-1/6 px-10'>
						<SearchFilter />
					</div>
					<div className='flex w-3/5 h-auto flex-col justify-start gap-5 '>
						<SearchList communityList={communityList}/>
					</div>
				</div>
			</div>
		</>
	);
};

export default ReadDetail;
