import { Card } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

interface groupListProps {
	communityId: number;
	categoryName: string;
	title: string;
	startAt: Date;
	hit: number;
	content: string;
}

const SearchList = ({ communityList }: { communityList: groupListProps[] }) => {
	const navigate = useNavigate();

	const categoryStyles: { [key: string]: string } = {
		비문학: 'bg-blue-200 border border-blue-500',
		정치: 'bg-gray-200 border border-gray-400 text-black',
		경제: 'bg-green-200 border border-green-400 text-black',
		사회: 'bg-yellow-100 border-yellow-400 text-black',
		'생활/문화': 'bg-purple-200 border-purple-400 text-black',
		'IT/과학': 'bg-indigo-200 border-indigo-400 text-black',
		세계: 'bg-pink-200 border-pink-400 text-black',
		오피니언: 'bg-red-200 border-red-400 text-black',
	};

	function getCategoryStyle(categoryName: string) {
		return categoryStyles[categoryName] || 'bg-gray-200 text-gray-800';
	}

	const handleCardClick = (community: groupListProps) => {
		navigate('/group', { state: { community } });
	};
	return (
		<>
			<div className='flex flex-row w-full h-full justify-start p-3 gap-5 flex-wrap '>
				{communityList.length > 0 ? (
					<>
						{communityList.map((community, index) => (
							<Card
								key={index}
								className='flex flex-col w-64 h-72  justify-between rounded-3xl border-gray-400 border hover:cursor-pointer'
								onClick={() => {
									handleCardClick(community);
								}}
							>
								<div className='flex flex-row justify-between text-center text-sm'>
									<div>👀 {community.hit}</div>

									<div className={`w-16 border rounded-md text-sm ${getCategoryStyle(community.categoryName)}`}>
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
										{community.content.length <= 70 ? (
											<div>{community.content} </div>
										) : (
											<div>{community.content.slice(0, 70)}...</div>
										)}
									</div>
								</div>
							</Card>
						))}
					</>
				) : (
					<div className='flex w-full flex-row justify-center'>참여 중인 모임이 없습니다</div>
				)}
			</div>
		</>
	);
};

export default SearchList;
