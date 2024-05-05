import { Card } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import communityList from '../../types/communityProps';

const SearchList = ({ totalCommunity }: { totalCommunity: communityList[] }) => {
	const navigate = useNavigate();

	const handleCardClick = (community: communityList) => {
		navigate('/detail', { state: { community } });
	};
	return (
		<>
			<div className='flex flex-row w-full h-full justify-start p-3 gap-5 flex-wrap '>
				{totalCommunity.map((community, index) => (
					<Card
						key={index}
						className='flex flex-col w-64 h-72  justify-between rounded-3xl border-gray-400 border hover:cursor-pointer'
						onClick={() => {
							handleCardClick(community);
						}}
					>
						<div className='flex flex-row justify-between text-center text-sm'>
							<div>👀 {community.hit}</div>
							<div className='w-16 border border-tag-100 bg-tag-50 rounded-md text-tag-100 text-sm'>
								{community.categoryName}
							</div>
						</div>
						<div className='flex flex-col h-4/5 text-start  gap-y-2'>
							<div className='text-l border-gray-200 border-b font-bold'>
								{community.title.length <= 13 ? (
									<div>{community.title} </div>
								) : (
									<div>{community.title.slice(0, 12)}...</div>
								)}
							</div>
							<div className='text-sm'>
								{community.content.length <= 120 ? (
									<div>{community.content} </div>
								) : (
									<div>{community.content.slice(0, 120)}...</div>
								)}
							</div>
						</div>
						<div className='flex flex-col gap-2'>
							<div className='w-32 border border-tag-100 bg-tag-50 rounded-md text-tag-100 text-sm'>마감일 13일전</div>
							<div className='border border-gray-700 rounded-md text-sm'>2024. 02. 26. 13:00</div>
						</div>
					</Card>
				))}
			</div>
		</>
	);
};

export default SearchList;
