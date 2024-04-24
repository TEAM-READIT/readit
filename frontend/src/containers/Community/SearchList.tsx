import { Card } from 'flowbite-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface GroupProps {
	id: number;
	title: string;
	tag: string;
	detail: string;
	date: string;
	// enddate:string;
	clicked: number;
	writer: string;
	participant: number;
	maxparticipant:number;

}

const SearchList = () => {
	const navigate = useNavigate();


	const groups: GroupProps[] = [
		{
			id: 1,
			title: '함께 취업 발표 준비합시다',
			tag: '시사',
			detail: '취업 발표 연습을 위해 함께 연습할 동료를 찾고 있습니다.',
			date: '2024.02.26 13:00',
			clicked: 523,
			writer: '가나다',
			participant: 1,
			maxparticipant: 4,
		},

		{
			id: 2,
			title: 'Seeking Partners',
			tag: '시사',
			date: '2024.02.26 13:00',
			detail:
				'To join, Please share a shor introduction about yourself and the topics you are passionate about presenting. Our goal is to create whatever i dont get what theyre talking bout',
			clicked: 523,
			writer: '가나다',
			participant: 1,
			maxparticipant: 4,
		},
		{
			id: 3,
			title: '저와 같이 심도 있는 토론 하실분 ',
			tag: '경제',
			date: '2024.02.26 13:00',
			detail: '집에서 집에 가고 싶다고 말하는 것은 무슨 의미인지 의문이 생겼습니다.',
			clicked: 523,
			writer: '가나다',
			participant: 1,
			maxparticipant: 4,
		},
		{
			id: 4,
			title: '제 37회 정기 독서토론',
			tag: '연애',
			date: '2024.02.26 13:00',
			detail: '회원님들 들어와주세요',
			clicked: 523,
			writer: '가나다',
			participant: 1,
			maxparticipant: 4,
		},
	];
	const handleCardClick = (group: GroupProps) => {
			navigate('/detail', { state: { group } });
	};
	return (
		<>
			<div className='flex flex-row w-full h-full justify-start p-3 gap-5 flex-wrap '>
				{groups.map((group, index) => (
					<Card
						key={index}
						className='flex flex-col w-64 h-72  justify-between rounded-3xl border-gray-400 border hover:cursor-pointer'
						onClick={()=>{handleCardClick(group)}}
						
					>
						<div className='flex flex-row justify-between text-center text-sm'>
							<div>👀 {group.clicked}</div>
							<div className='w-16 border border-tag-100 bg-tag-50 rounded-md text-tag-100 text-sm'>{group.tag}</div>
						</div>
						<div className='flex flex-col h-4/5 text-start font-bold gap-y-2'>
							<div className='text-l border-gray-200 border-b'>
								{group.title.length <= 13 ? <div>{group.title} </div> : <div>{group.title.slice(0, 12)}...</div>}
							</div>
							<div className='text-sm'>
								{group.detail.length <= 120 ? <div>{group.detail} </div> : <div>{group.detail.slice(0, 120)}...</div>}
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
