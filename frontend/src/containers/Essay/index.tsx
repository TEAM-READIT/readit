import Headers from '../../components/Headers';
import SearchFilter from './SearchFilter';
import EssayHeader from './EssayHeader';
import SearchList from './SearchList';

const Essay = () => {
	return (
		<>
			<div className='w-full flex justify-center flex-col items-center h-screen'>
				<Headers />
				<div className='flex flex-col w-3/5 h-full justify-start  items-center '>
					<EssayHeader />
					<div className='flex w-full h-full flex-row justify-start gap-x-5'>
						<SearchFilter />
            <SearchList/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Essay;
