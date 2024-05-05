import { scoreRanking } from '../../types/challengeProps';
import { useEffect, useState } from 'react';

const Rank = () => {
	const [startIndex, setStartIndex] = useState(0); // 랭킹 시작 인덱스 상태
	const rankingPerPage = 16; // 한 페이지에 보여줄 랭킹 수

	const ranking: scoreRanking = {
		myRank: 1,
		memberList: [
			{ name: '오영주', profile: '123' },
			{ name: '오영주', profile: '123' },
			{ name: '오영주', profile: '123' },
			{ name: '오영주', profile: '123' },
			{ name: '오영주', profile: '123' },
			{ name: '오영주', profile: '123' },
			{ name: '오영주', profile: '123' },
			{ name: '오영주', profile: '123' },
			{ name: '오영주', profile: '123' },
			{ name: '오영주', profile: '123' },
			{ name: '오영주', profile: '123' },
			{ name: '박현춘', profile: '123' },
			{ name: '오영주', profile: '123' },
			{ name: '박현춘', profile: '123' },
			{ name: '오영주', profile: '123' },
		],
	};

	useEffect(() => {
		// 일정 시간마다 랭킹을 이동하도록 설정
		const intervalId = setInterval(() => {
			if (startIndex + rankingPerPage < ranking.memberList.length) {
				setStartIndex(startIndex + 1);
			} else {
				setStartIndex(0);
			}
		}, 3000); // 3초마다 이동

		return () => clearInterval(intervalId); // 언마운트 시 clearInterval 호출하여 메모리 누수 방지
	}, [startIndex, ranking.memberList.length]);

	return (
		<div>
			<div className='flex w-full justify-center h-full flex-row p-8 gap-10  '>
{/* 								
				<span className='font-bold'>랭킹</span>
				
				<div className='flex flex-row gap-5' style={{ transition: 'all 0.3s ease-in-out' }}>
					{ranking.memberList.slice(startIndex, startIndex + rankingPerPage).map((member, index) => (
						<div key={index} className='flex flex-row gap-2'>
							<div>{startIndex + index + 1}등</div>
							<div>{member.name}</div>
						</div>
					))}
				</div> */}
			</div>
		</div>
	);
};

export default Rank;
