import Headers from '../../components/Headers';
import SearchFilter from './SearchFilter';
import SearchList from './SearchList';
import CommunityHeader from './CommunityHeader';

const Community = () => {
	return (
		<>
			<div className='w-full flex justify-center flex-col items-center h-full'>
				<Headers />
				<div className='flex flex-col w-3/5 h-full justify-start  items-center '>
					<CommunityHeader />
				</div>
				<div className='flex flex-row w-full justify-start gap-20 h-auto'>
					<div className='h-auto w-1/6 px-10'>
						<SearchFilter />
					</div>
					<div className='flex w-3/5 h-auto flex-col justify-start gap-5 '>
						<SearchList />
					</div>
				</div>
			</div>
		</>
	);
};

export default Community;
