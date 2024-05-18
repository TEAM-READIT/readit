import Headers from '../../components/Headers';
import { useEffect, useState } from 'react';
import Content from './Content';
import Problems from './Problems';
import { ChallengeProps } from '../../types/challengeProps';
import { useAuthStore } from '../../store/auth';
import { scoreRanking } from '../../types/challengeProps';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartData,
	PointElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend);
import { Line } from 'react-chartjs-2';
import ChallengeHeader from './ChallengeHeader';
import useUserStore from '../../store/user';

interface ChallengeScore {
	date: Date;
	score: number;
}

interface ChallengeScores {
	totalScoreList: ChallengeScore[];
	isSubmitToday: boolean;
}

interface ChallengeScoreList {
	scoreList: ChallengeScore[];
}

const Challenge = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const [problems, setProblems] = useState<ChallengeProps>();
	const [challengegraphData, setChallengeGraphData] = useState<ChartData<'line', number[], unknown>>({
		labels: [],
		datasets: [],
	});
	const { name, profileImageUrl } = useUserStore();

	const { accessToken } = useAuthStore();
	const [number, setNumber] = useState<number>(0);
	const [rank, setRank] = useState<scoreRanking>();
	const [challengeScoreList, setChallengeScoreList] = useState<ChallengeScoreList>();
	const [challengeScoresList, setChallengeScoresList] = useState<ChallengeScores>();

	// 챌린지 문제 받아오기
	const RankData = async () => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};
		const data = await fetch(`${baseUrl}/challenge/rank`, {
			headers: headers,
		}).then((response) => response.json());
		setRank(data);
		return data;
	};

	useEffect(() => {
		RankData();
	}, []);
	// // 챌린지 점수 통계 받아오기
	const challengScoreData = async () => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};
		const response = await fetch(`${baseUrl}/challenge/stats`, {
			headers: headers,
		});

		const data = await response.json();
		return data;
	};

	const myScoreList: number[] = [];
	// 빈 값 넣을 함수 만들어보자
	useEffect(() => {
		if (challengeScoreList) {
			const mychallangeData = challengeScoreList?.scoreList;
			myScoreList.push(mychallangeData[0]?.score);
			if (mychallangeData.length > 0) {
				for (let i = 1; i < mychallangeData?.length!; i++) {
					const daybeforelatest = mychallangeData[i - 1]?.date;
					const latest = mychallangeData[i]?.date;
					const timediff = Math.floor(
						(new Date(latest).getTime() - new Date(daybeforelatest).getTime()) / (1000 * 3600 * 24),
					);
					if (timediff > 1) {
						for (let j = 0; j < timediff; j++) {
							myScoreList.push(mychallangeData[i - 1]?.score);
						}
					} else {
						myScoreList.push(mychallangeData[i]?.score);
					}
				}
				if (myScoreList.length < challengeScoresList?.totalScoreList.length!) {
					for (let i = 0; i <= challengeScoresList?.totalScoreList.length! - myScoreList.length; i++) {
						myScoreList.unshift(1000);
					}
				}
			}
		}
	});

	// 전체 사용자 챌린지 점수 통계 받아오기
	const challengScoreDatas = async () => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};
		const response = await fetch(`${baseUrl}/challenge/stats/total`, {
			headers: headers,
		});
		const data = await response.json();
		return data;
	};

	useEffect(() => {
		challengScoreData()
			.then((res) => setChallengeScoreList(res))
			.catch((_err) => {});
		challengScoreDatas()
			.then((res) => {
				setChallengeScoresList(res);
			})
			.catch((_err) => {});
	}, []);

	// 챌린지 문제 받아오기
	const challengeData = async () => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};
		const data = await fetch(`${baseUrl}/challenge`, {
			headers: headers,
		}).then((response) => response.json());
		return data;
	};

	useEffect(() => {
		if (number === 1) {
			challengeData()
				.then((res) => {
					if (res) {
						setProblems(res);
					}
				})
				.catch((_err) => {});
		}
	}, [number]);

	useEffect(() => {
		const challengescore: number[] = [];
		const challengeXlist: string[] = [];
		const challengescores: number[] = [];
		const cs = challengeScoreList?.scoreList;
		const css = challengeScoresList?.totalScoreList;

		cs?.forEach((score: ChallengeScore) => {
			challengescore.push(score.score);
		});
		css?.forEach((score: ChallengeScore) => {
			challengescores.push(score.score);
			challengeXlist.push(score.date.toString());
		});

		const faceColor = 'rgba(255, 165, 0, 1)';
		// const pronunciationColor = 'rgba(154, 205, 50, 1)';
		const challengeColor = 'rgba(55,117,255,1)';

		setChallengeGraphData({
			labels: challengeXlist,
			datasets: [
				{
					label: '내 점수',
					data: myScoreList,
					borderColor: challengeColor,
					backgroundColor: challengeColor,
					fill: false,
				},
				{
					label: '전체 사용자 평균 점수',
					data: challengescores,
					borderColor: faceColor,
					backgroundColor: faceColor,
					fill: false,
				},
			],
		});
	}, [challengeScoreList, challengeScoresList]);

	const options = {
		scales: {
			y: {
				min: 975,
				max: 1025,
			},
		},
	};
	const challengeIntro =
		'안녕하십니까? 본 테스트는 READIT 당신의 문해력+에서 준비한 성인 문해력 테스트로, 우리나라 성인들의 문해력을 대략적으로 조사하기 위한 것입니다.\n검사지는 비문학에서 접하는 글을 파악하고 활용하는 능력을 묻는 간단한 2개의 문항으로 구성되어 있습니다. 챌린지는 하루에 한번만 응시 가능합니다.\n모든 문항에 성실하게 답해주시기 바랍니다. 감사합니다.';
	return (
		<>
			<div className='w-full h-screen flex flex-col items-center  overflow-hidden pr-5'>
				<Headers />
				{number === 0 ? (
					<>
						<div className='flex flex-col w-3/5 justify-start items-center h-full select-none'>
							<ChallengeHeader />

							<div className='flex flex-col w-full h-full'>
								<div className='flex flex-col w-full text-start bg-blue-100 border border-blue-400 rounded-lg p-5 whitespace-pre-wrap gap-5 '>
									{challengeIntro}
								</div>

								<div className='flex flex-row w-full items-start justify-between h-4/5 pt-5'>
									<div className='flex flex-col gap-3 w-2/6 h-full px-2'>
										<span className='font-bold py-5 text-2xl'>랭킹</span>
										{rank ? (
											<>
												{rank?.memberList?.slice(0, 5).map((member, index) => (
													<div key={index} className='flex flex-row items-center px-5'>
														<div className='flex flex-row items-center gap-5 w-3/4 relative'>
															<img src={member.profile} alt='프로필 사진' className='w-12 h-12 rounded-full ' />
															{member.rank === 1 && index === 0 ? (
																<>
																	<div className='absolute -top-2 -left-1'>
																		<span className='text-2xl text-yellow-400'>
																			<svg
																				xmlns='http://www.w3.org/2000/svg'
																				width='1em'
																				height='1em'
																				viewBox='0 0 24 24'
																			>
																				<path
																					fill='currentColor'
																					d='M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14z'
																				/>
																			</svg>
																		</span>
																	</div>
																</>
															) : (
																<></>
															)}
															<div className=''>{member.rank}등</div>
															<div>{member.name}</div>
														</div>
														<div className='w-'>
															<div className='flex flex-row justify-end  '>
																<div>{member.challengeScore}점</div>
															</div>
														</div>
													</div>
												))}
											</>
										) : null}
										<div className='flex flex-col w-full justify-center gap-2 bg-yellow-100 border border-yellow-200 px-5 p-2 rounded-lg'>
											{challengeScoreList ? (
												<>
													<div className='flex flex-row justify-start'>
														<span className='font-bold '>My Rank</span>
													</div>
													<div className=' flex flex-row  items-center w-full'>
														<div className='flex flex-row items-center gap-5 w-3/4 relative'>
															<img src={profileImageUrl} alt='프로필' className='h-12 aspect-square rounded-full' />
															<span>{rank?.myRank}등</span>
															{name}
														</div>
														<div className='flex flex-row justify-end '>
															<span>
																{challengeScoreList ? (
																	<>
																		{challengeScoreList?.scoreList[challengeScoreList?.scoreList.length! - 1]?.score ? (
																			<>
																				{
																					challengeScoreList?.scoreList[challengeScoreList?.scoreList.length! - 1]
																						?.score
																				}
																			</>
																		) : (
																			'   1000'
																		)}
																		점
																	</>
																) : null}
															</span>
														</div>
													</div>
												</>
											) : null}
										</div>
									</div>
									<div className='w-3/5 h-full items-center flex flex-col gap-3 '>
										<span className='font-bold py-5 text-2xl'>통계</span>
										<Line data={challengegraphData} options={options}></Line>
										<div className='flex flex-row justify-end pt-10 w-full'>
											{challengeScoresList && challengeScoresList.isSubmitToday === true ? (
												<div className=' rounded-lg  text-center p-3  px-10 justify-center items-center text-sm  border bg-gray-400 text-white border-gray-300'>
													<span>오늘 이미 참여했습니다</span>
												</div>
											) : (
												<button
													className=' rounded-lg  text-center p-3  px-10 justify-center items-center text-sm  border bg-blue-700 text-white border-blue-300 hover:bg-blue-800 '
													onClick={() => setNumber(1)}
												>
													<span>시작하기</span>
												</button>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				) : (
					<>
						<div className='flex flex-col w-3/5 justify-start items-center '>
							<ChallengeHeader />
						</div>
						{problems?.content ? (
							<div className='flex flex-row w-full h-full items-start justify-center gap-10 '>
								<Content problems={problems} />
								<Problems articleId={problems.articleId} problemList={problems.problemList} />
							</div>
						) : null}
						{problems && problems.status === 400 && (
							<div className='text-red-500 text-2xl pt-20'>오늘의 챌린지에 이미 참여하였습니다.</div>
						)}
					</>
				)}
			</div>
		</>
	);
};

export default Challenge;
