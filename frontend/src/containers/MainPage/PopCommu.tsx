import { Card } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface communityList {
	communityId: number;
	hits: number;
	writerName: string;
	maxParticipants: number;
	currentParticipants: number;
	categoryName: string;
	title: string;
	content: string;
	startAt: Date;
	endAt: Date;
}

const PopCommu = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const navigate = useNavigate();
	const handleCardClick = (community: communityList) => {
		console.log(community);
		navigate('/detail', { state: { community } });
	};
	const [popCommunity, setPopCommunity] = useState<communityList[]>();
	//인기 있는 모임 받아오기
	const popCommunityData = async () => {
		const data = await fetch(`${baseUrl}/article`).then((response) => response.json());
		return data;
	};

	useEffect(() => {
		popCommunityData()
			.then((res) => setPopCommunity(res))
			.catch((err) => {
				console.log('커뮤니티 받아오기 에러');
			});
	}, []);

	// const popCommunity: Community[] = [
	// 	{
	// 		communityId: 1,
	// 		hits: 523,
	// 		writerName: '오영주',
	// 		maxParticipants: 4,
	// 		currentParticipants: 2,
	// 		categoryName: '시사',
	// 		title: 'Seeking Partners',
	// 		content:
	// 			'To join, Please share a shor introduction about yourself and the topics you are passionate about presenting. Our goal is to create whatever i dont get what theyre talking bout',

	// 		startAt: new Date(),
	// 		endAt: new Date(),
	// 	},

	// 	{
	// 		communityId: 2,
	// 		hits: 523,
	// 		writerName: '박현춘',
	// 		maxParticipants: 8,
	// 		currentParticipants: 1,
	// 		categoryName: '취업',
	// 		title: '함께 취업 발표 준비합시다',
	// 		content: '취업 발표 연습을 위해 함께 연습할 동료를 찾고 있습니다.',
	// 		startAt: new Date(),
	// 		endAt: new Date(),
	// 	},
	// 	{
	// 		communityId: 3,
	// 		title: '저와 같이 심도 있는 토론 하실분 ',
	// 		hits: 523,
	// 		writerName: '박현춘',
	// 		maxParticipants: 8,
	// 		currentParticipants: 1,
	// 		categoryName: '경제',
	// 		content: '집에서 집에 가고 싶다고 말하는 것은 무슨 의미인지 의문이 생겼습니다.',
	// 		startAt: new Date(),
	// 		endAt: new Date(),
	// 	},
	// 	{
	// 		communityId: 4,
	// 		title: '제 37회 정기 독서토론',
	// 		categoryName: '연애',
	// 		writerName: '박현춘',
	// 		maxParticipants: 8,
	// 		currentParticipants: 1,
	// 		content: '회원님들 들어와주세요',
	// 		hits: 523,
	// 		startAt: new Date(),
	// 		endAt: new Date(),
	// 	},
	// ];

	return (
		<>
			<div className='flex flex-col w-full items-center pb-10'>
				<div className='flex flex-row w-full h-28 items-center text-gray-400 font-bold text-2xl text-end gap-x-16'>
					<div className='text-black hover:cursor-pointer'>
						<div>🔥 이번 주 리딧 인기 모임</div>
					</div>
				</div>
				<div className='flex flex-row w-full justify-start px-5 gap-5 flex-wrap'>
					<>
						{popCommunity?.map((community, index) => (
							<Card
								key={index}
								className='flex flex-col w-64 h-44  justify-between rounded-3xl border-gray-400 border hover:cursor-pointer'
								onClick={() => handleCardClick(community)}
							>
								<div className='flex justify-end gap-2 h-1/5'>
									<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
										#{community.categoryName}
									</div>
								</div>
								<div className='h-3/5 text-start font-bold'>
									{community.title.length <= 35 ? (
										<div>{community.title} </div>
									) : (
										<div>{community.title.slice(0, 35)}...</div>
									)}
								</div>
								<div className='text-end text-sm'>👀 조회수 {community.hits}</div>
							</Card>
						))}
					</>
				</div>
			</div>
		</>
	);
};
export default PopCommu;
