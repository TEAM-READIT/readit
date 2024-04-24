import Headers from '../../components/Headers';
import SearchFilter from './SearchFilter';
import EssayHeader from './EssayHeader';
import SearchList from './SearchList';

const Essay = () => {
	return (
		<>
			<div className='w-full h-full flex justify-center flex-col items-center'>
				<Headers />
				<div className='flex flex-col w-3/5 justify-start items-center '>
					<EssayHeader />
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

export default Essay;
