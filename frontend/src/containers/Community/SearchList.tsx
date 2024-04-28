import { Card } from 'flowbite-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Community {
	communityId: number;
	hits: number;
	writerName: string;
	maxParticipants: number;
	currentParticipants: number;
	categoryName: string;
	title: String;
	content: String;
	startAt: Date;
	endAt: Date;
}

const SearchList = () => {
	const navigate = useNavigate();


	const popCommunity: Community[] = [
		{
			communityId: 1,
			hits: 523,
			writerName: '오영주',
			maxParticipants: 4,
			currentParticipants: 2,
			categoryName: '시사',
			title: 'Seeking Partners',
			content:
				'To join, Please share a shor introduction about yourself and the topics you are passionate about presenting. Our goal is to create whatever i dont get what theyre talking bout',

			startAt: new Date(),
			endAt: new Date(),
		},

		{
			communityId: 2,
			hits: 523,
			writerName: '박현춘',
			maxParticipants: 8,
			currentParticipants: 1,
			categoryName: '취업',
			title: '함께 취업 발표 준비합시다',
			content: '취업 발표 연습을 위해 함께 연습할 동료를 찾고 있습니다.',
			startAt: new Date(),
			endAt: new Date(),
		},
		{
			communityId: 3,
			title: '저와 같이 심도 있는 토론 하실분 ',
			hits: 523,
			writerName: '박현춘',
			maxParticipants: 8,
			currentParticipants: 1,
			categoryName: '경제',
			content: '집에서 집에 가고 싶다고 말하는 것은 무슨 의미인지 의문이 생겼습니다.',
			startAt: new Date(),
			endAt: new Date(),
		},
		{
			communityId: 4,
			title: '제 37회 정기 독서토론',
			categoryName: '연애',
			writerName: '박현춘',
			maxParticipants: 8,
			currentParticipants: 1,
			content: '회원님들 들어와주세요',
			hits: 523,
			startAt: new Date(),
			endAt: new Date(),
		},
	];

	const handleCardClick = (community: Community) => {
		navigate('/detail', { state: { community } });
	};
	return (
		<>
			<div className='flex flex-row w-full h-full justify-start p-3 gap-5 flex-wrap '>
				{popCommunity.map((community, index) => (
					<Card
						key={index}
						className='flex flex-col w-64 h-72  justify-between rounded-3xl border-gray-400 border hover:cursor-pointer'
						onClick={() => {
							handleCardClick(community);
						}}
					>
						<div className='flex flex-row justify-between text-center text-sm'>
							<div>👀 {community.hits}</div>
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
