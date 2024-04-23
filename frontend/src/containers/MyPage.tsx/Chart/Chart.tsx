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

const Chart = () => {
	const [graphData, setGraphData] = useState<ChartData<'line', number[], unknown>>({
		labels: [],
		datasets: [],
	});

	useEffect(() => {
		const liter = [10, 20, 40, 10, 30, 40, 50];
		const news = [20, 30, 40, 50, 20, 30, 60,100];

		const faceColor = 'rgba(255, 165, 0, 1)';
		const pronunciationColor = 'rgba(154, 205, 50, 1)';
		const xlist = new Array(10).fill('');
		xlist[0] = '이전';
		xlist[xlist.length - 1] = '현재';

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
				<div className='text-2xl font-bold flex justify-start p-5'>최근 점수 변화</div>
				<Line data={graphData}></Line>
			</div>
		</>
	);
};

export default Chart