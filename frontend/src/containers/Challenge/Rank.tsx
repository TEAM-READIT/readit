import { Card } from "flowbite-react";

interface ChallengeProps {
	articleId: number;
	content: string;
	problemList: problemListProps[];
}

interface problemListProps {
	problemNumber: number;
	problem: string;
	optionList: optionListProps[];
}

interface optionListProps {
	optionNumber: number;
	option: string;
}

interface memberRanking {
	name: string;
	profile: string;
}

interface scoreRanking {
	memberList: memberRanking[];
	myRank: number;
}

const Rank = () => {
//TODO: 여기서 rank get 호출
  const ranking: scoreRanking = {
		myRank: 1,
		memberList: [
			{
				name: '오영주',
				profile: '123',
			},
			{
				name: '박현춘',
				profile: '123',
			},
			{
				name: '오영주',
				profile: '123',
			},
			{
				name: '박현춘',
				profile: '123',
			},
			{
				name: '오영주',
				profile: '123',
			},
		],
	};



	return (
		<>
			<div className='flex w-1/6 justify-center h-4/5 flex-col py-20 '>
				<Card className='h-full'>
					<span className='font-bold text-2xl pb-10'>랭킹</span>
					{ranking.memberList.map((member, index) => (
						<div key={index}>
							<div className='flex py-2 gap-10 justify-center text-xl'>
								{index == 0 ? (
									<>
										<span className='text-2xl text-yellow-400'>
											<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
												<path
													fill='currentColor'
													d='M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14z'
												/>
											</svg>
										</span>
										<span className='font-semibold'>{member.name}</span>
									</>
								) : (
									<>
										<div>{index + 1}등</div>
										<div>{member.name}</div>
									</>
								)}
							</div>
						</div>
					))}
					{/* <div className='text-2xl font-bold'>내 등수 : {ranking.myRank}</div> */}
				</Card>
			</div>
		</>
	);
};

export default Rank;
