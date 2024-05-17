import { useEffect, useState } from 'react';
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
import { useAuthStore } from '../../../store/auth';

interface scoreList {
	type: string;
	score: number;
}

interface ChallengeScore {
	date: Date;
	score: number;
}

interface ChallengeScoreList {
	scoreList: ChallengeScore[]
}

const Chart = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const summary = 0b0;
	const challenge = 0b1;
	const [mode, setMode] = useState(summary);
	const [scoreList, setScoreList] = useState<{ scoreList: scoreList[] }>(); // scoreList 타입 변경
	const { accessToken } = useAuthStore();
	const [challengeScoreList, setChallengeScoreList] = useState<ChallengeScoreList>();

	// 글 요약 점수 통계 받아오기
	const scoreData = async () => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};
		const response = await fetch(`${baseUrl}/article/stats`, {
			headers: headers,
		});
		const data = await response.json();
		return data;
	};
	
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


	useEffect(() => {
		scoreData()
			.then((res) => setScoreList(res))
			.catch((_err) => {
			});
		challengScoreData()
			.then((res) => setChallengeScoreList(res))
			.catch((_err) => {
			});
	},[]);

	const [graphData, setGraphData] = useState<ChartData<'line', number[], unknown>>({
		labels: [],
		datasets: [],
	});
	const [challengegraphData, setChallengeGraphData] = useState<ChartData<'line', number[], unknown>>({
		labels: [],
		datasets: [],
	});
	useEffect(() => {
		const liter: number[] = [];
		const news: number[] = [];
		const challengescore: number[] = [];
		const challengeXlist: string[] = [];

		const scores = scoreList?.scoreList;
		scores?.forEach((score: scoreList) => {
			// score 변수 사용
			if (score.type === 'NEWS') {
				// 각 score 객체의 type 속성 확인
				news.unshift(score.score);
			} else {
				liter.unshift(score.score);
			}
		});
		const cs = challengeScoreList?.scoreList;

		cs?.forEach((score :ChallengeScore) => {
			challengescore.push(score.score);
			challengeXlist.push(score.date.toString());
		});

		const arraylength = () => {
			if (liter.length > news.length) {
				return liter.length;
			} else {
				return news.length;
			}
		};
		const faceColor = 'rgba(255, 165, 0, 1)';
		const pronunciationColor = 'rgba(154, 205, 50, 1)';
		const challengeColor = 'rgba(55,117,255,1)';
		const xlist = new Array(arraylength()).fill('');
		xlist[0] = '이전';
		xlist[xlist.length - 1] = '현재';

		setChallengeGraphData({
			labels: challengeXlist,
			datasets: [
				{
					label: '점수',
					data: challengescore,
					borderColor: challengeColor,
					backgroundColor: challengeColor,
					fill: false,
				},
			],
		});
		setGraphData({
			labels: xlist,
			datasets: [
				{
					label: '뉴스',
					data: liter,
					borderColor: faceColor,
					backgroundColor: faceColor,
					fill: false,
				},
				{
					label: '비문학',
					data: news,
					borderColor: pronunciationColor,
					backgroundColor: pronunciationColor,
					fill: false,
				},
			],
		});
	}, [scoreList,challengeScoreList]);
	const options = {
		scales: {
			y: {
				min: 750,
				max: 1250,
			},
		},
	};
	const options2 = {
		scales: {
			y: {
				min: 0,
				max: 100,
			},
		},
	};
	return (
		<>
			<div className='w-2/3 h-1/3 flex flex-col'>
				<div className='flex flex-row'>
					<div
						className={`text-lg text-${mode == summary ? 'black' : 'gray-500'} font-bold flex justify-start p-5 hover:cursor-pointer`}
						onClick={() => setMode(summary)}
					>
						요약 점수 변화
					</div>
					<div
						className={`text-lg text-${mode == summary ? 'gray-500' : 'black'} font-bold flex justify-start p-5 hover:cursor-pointer`}
						onClick={() => setMode(challenge)}
					>
						챌린지 점수 변화
					</div>
				</div>
				{mode == summary ? (
					<Line data={graphData} options={options2}></Line>
				) : (
					<Line data={challengegraphData} options={options}></Line>
				)}
			</div>
		</>
	);
};

export default Chart;
