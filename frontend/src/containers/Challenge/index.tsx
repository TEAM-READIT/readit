import Headers from '../../components/Headers';
import { useEffect, useState } from 'react';
import Rank from './Rank';
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
	// ChartData,
	PointElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend);
// import { Line } from 'react-chartjs-2';

interface ChallengeScore {
	date: Date;
	score: number;
}

interface ChallengeScoreList {
	scoreList: ChallengeScore[]
}


const Challenge = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const [problems, setProblems] = useState<ChallengeProps>();
	const { accessToken } = useAuthStore();
	const [number, 
		// setNumber
	] = useState<number>(0);
	const [rank, setRank] = useState<scoreRanking>();
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

	const [
		// challengeScoreList
		, setChallengeScoreList] = useState<ChallengeScoreList>();

	useEffect(() => {
		challengScoreData()
			.then((res) => setChallengeScoreList(res))
			.catch((_err) => {
					console.log('챌린지 요약 점수 받아오는거 에러')
			});
	},[]);

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
	console.log('rnrn?',rank?.memberList)
	return (
		<>
			{number === 0 ? (
				<>
					<div className='w-full h-screen flex flex-col items-center  overflow-hidden'>
						<Headers />
						<div className='flex flex-row w-full h-full items-start justify-center gap-10 '>

							<div className='flex flex-col gap-5'>
							<span className='font-bold'>랭킹</span>
								{rank?.memberList.map((member, index) => (
									<div key={index} className='flex flex-row gap-2 items-center'>
										<img src={member.profile} alt="프로필 사진" className='w-16 rounded-full'/>
										<div>{index + 1}등</div>
										<div>{member.name}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</>
			) : (
				<div className='w-full h-screen flex flex-col items-center  overflow-hidden'>
					<Headers />
					<Rank />
					{problems?.content ? (
						<div className='flex flex-row w-full h-full items-start justify-center gap-10 '>
							<Content problems={problems} />
							<Problems articleId={problems.articleId} problemList={problems.problemList} />
						</div>
					) : null}
					{problems && problems.status === 400 && (
						<div className='text-red-500 text-2xl pt-20'>오늘의 챌린지에 이미 참여하였습니다.</div>
					)}
				</div>
			)}
		</>
	);
};

export default Challenge;
