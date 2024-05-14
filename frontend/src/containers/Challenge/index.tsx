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
import { useNavigate } from 'react-router-dom';

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
			myScoreList.push(mychallangeData[0].score);
			if (mychallangeData.length > 0) {
				for (let i = 1; i < mychallangeData?.length!; i++) {
					const daybeforelatest = mychallangeData[i - 1].date;
					const latest = mychallangeData[i].date;
					const timediff = Math.floor(
						(new Date(latest).getTime() - new Date(daybeforelatest).getTime()) / (1000 * 3600 * 24),
					);
					if (timediff > 1) {
						for (let j = 0; j < timediff; j++) {
							myScoreList.push(mychallangeData[i - 1].score);
						}
					}
					else{
						myScoreList.push(mychallangeData[i].score);
					}
				}
				if (myScoreList.length < challengeScoresList?.totalScoreList.length!) {
					for (let i = 0; i <= challengeScoresList?.totalScoreList.length! - myScoreList.length; i++) {
						myScoreList.unshift(myScoreList[0]);
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
			.catch((_err) => {
				console.log('챌린지 요약 점수 받아오는거 에러');
			});
		challengScoreDatas()
			.then((res) => {
				setChallengeScoresList(res);
			})
			.catch((_err) => {
				console.log('챌린지 요약 점수 받아오는거 에러');
			});
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
		challengeData()
			.then((res) => {
				if (res) {
					setProblems(res);
				}
			})
			.catch((_err) => {
				console.log('챌린지 받아오는거 에러');
			});
	}, []);

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
	const navigate = useNavigate();

	const options = {
		scales: {
			y: {
				min: 975,
				max: 1025,
			},
		},
	};

	return (
		<>
			<div className='w-full h-screen flex flex-col items-center  overflow-hidden'>
				<Headers />
				{number === 0 ? (
					<>
						<div className='flex flex-col w-3/5 justify-start items-center h-full'>
							<ChallengeHeader />

							<div className='flex flex-col w-full h-full'>
								<div className='flex flex-row w-full text-start bg-blue-100 border border-blue-400 rounded-lg p-5'>
									안녕하십니까? 본 테스트는 READIT 당신의 문해력+에서 준비한 성인 문해력 테스트로, 우리나라 성인들의
									문해력을 대략적으로 조사하기 위한 것입니다. 검사지는 비문학에서 접하는 글을 파악하고 활용하는 능력을
									묻는 간단한 2개의 문항으로 구성되어 있습니다. 챌린지는 하루에 한번만 응시 가능합니다. 모든 문항에
									성실하게 답해주시기 바랍니다. 감사합니다.
								</div>
								<div className='flex flex-row justify-center pt-10'>
									{challengeScoreList ? (
										<>
											<div className=' flex flex-row gap-20 font-bold text-xl'>
												<span>
													내 점수 : {challengeScoreList?.scoreList[challengeScoreList?.scoreList.length! - 1]?.score}
												</span>
												<span>내 등수 : {rank?.myRank}</span>
											</div>
										</>
									) : null}
								</div>
								<div className='flex flex-row w-full items-start justify-between h-3/5'>
									<div className='flex flex-col gap-5 w-1/5 h-full justify-center'>
										<span className='font-bold'>랭킹</span>
										{rank?.memberList.slice(0, 5).map((member, index) => (
											<div key={index} className='flex flex-row gap-5 items-center'>
												<img src={member.profile} alt='프로필 사진' className='w-12 rounded-full' />
												<div className=''>{index + 1}등</div>
												<div>{member.name}</div>
											</div>
										))}
									</div>
									<div className='w-3/5 h-full items-center flex flex-row justify-center'>
										<Line data={challengegraphData} options={options}></Line>
									</div>
								</div>

								<div className='flex flex-row justify-end'>
									{problems && problems.status === 400 ? (
										<button
											className=' rounded-lg  text-center p-3  px-10 justify-center items-center text-sm  border bg-red-700 text-white border-red-300 hover:bg-red-800 '
											onClick={() => navigate('/')}
										>
											<span>참여 완료</span>
										</button>
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
