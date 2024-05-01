import React, { useEffect, useState } from 'react';
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

interface scoreList {
	type: string;
	score: number;
}

interface ChallengeScoreList {
	date: Date;
	score: number;
}

const Chart = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const summary = 0b0;
	const challenge = 0b1;
	const [mode, setMode] = useState(summary);
	const [scoreList, setScoreList] = useState<scoreList[]>();
	// const [challengeScoreList, setChallengeScoreList] = useState<ChallengeScoreList[]>();

	// // 글 요약 점수 통계 받아오기
	// const scoreData = async () => {
	// 	const data = await fetch(`${baseUrl}/article/statistics`).then((response) => response.json());
	// 	return data;
	// };

	// // 챌린지 점수 통계 받아오기
	// const challengScoreData = async () => {
	// 	const data = await fetch(`${baseUrl}/challenge/statistics`).then((response) => response.json());
	// 	return data;
	// };

	// useEffect(() => {
	// 	scoreData()
	// 		.then((res) => setScoreList(res))
	// 		.catch((err) => {
	// 			console.log('글 요약 점수 받아오는거 에러');
	// 		});
	// 	challengScoreData().then((res) => setChallengeScoreList(res)).catch((err) => {
	// 		console.log('챌린지 요약 점수 받아오는거 에러')
	// 	})
	// }, []);

	const challengeScoreList = [
		{
			date: new Date(),
			score: 1000,
		},
		{
			date: new Date(),
			score: 1002,
		},
		{
			date: new Date(),
			score: 1005,
		},
		{
			date: new Date(),
			score: 1003,
		},
		{
			date: new Date(),
			score: 1010,
		},
		{
			date: new Date(),
			score: 1009,
		},
		{
			date: new Date(),
			score: 1011,
		},
		{
			date: new Date(),
			score: 1011,
		},
	];

	const [graphData, setGraphData] = useState<ChartData<'line', number[], unknown>>({
		labels: [],
		datasets: [],
	});
	const [challengegraphData, setChallengeGraphData] = useState<ChartData<'line', number[], unknown>>({
		labels: [],
		datasets: [],
	});
	useEffect(() => {
		// const liter:number[] = [];
		// const news: number[] = [];
		const challengescore: number[] = [];
		const challengeXlist: string[] = [];
		scoreList?.forEach((scores) => {
			if (scores.type === '뉴스') {
				liter.push(scores.score);
			} else {
				news.push(scores.score);
			}
		});
		challengeScoreList?.forEach((score) => {
			challengescore.push(score.score);
			challengeXlist.push(score.date.toLocaleDateString());
		});

		const liter = [10, 20, 40, 10, 30, 40, 50];
		const news = [20, 30, 40, 50, 20, 30, 60, 100];
		const arraylength = () => {
			if (liter.length > news.length) {
				return liter.length;
			} else {
				return news.length;
			}
		};
		const faceColor = 'rgba(255, 165, 0, 1)';
		const pronunciationColor = 'rgba(154, 205, 50, 1)';
		const challengeColor = 'rgba(55,117,255,1)'
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
	}, []);

	return (
		<>
			<div className='w-2/3 h-1/3 flex flex-col'>
				<div className='flex flex-row'>
					<div
						className={`text-2xl text-${mode == summary ? 'black' : 'gray-500'} font-bold flex justify-start p-5 hover:cursor-pointer`}
						onClick={() => setMode(summary)}
					>
						요약 점수 변화
					</div>
					<div
						className={`text-2xl text-${mode == summary ? 'gray-500' : 'black'} font-bold flex justify-start p-5 hover:cursor-pointer`}
						onClick={() => setMode(challenge)}
					>
						챌린지 점수 변화
					</div>
				</div>
				{mode == summary ? <Line data={graphData}></Line> : <Line data={challengegraphData}></Line>}
			</div>
		</>
	);
};

export default Chart;
