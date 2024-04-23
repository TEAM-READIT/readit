import Headers from '../../components/Headers';
import SearchFilter from './SearchFilter';
import SearchList from './SearchList';
import CommunityHeader from './CommunityHeader';

const Community = () => {
	return (
		<>
			<div className='w-full flex justify-center flex-col items-center h-screen'>
				<Headers />
				<div className='flex flex-col w-3/4 h-full justify-start  items-center '>
					<CommunityHeader/>
					<div className='flex w-full h-full flex-row justify-start gap-x-5'>
						<SearchFilter />
						<SearchList/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Community;
