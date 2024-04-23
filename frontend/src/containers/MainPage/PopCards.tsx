import { Card } from 'flowbite-react';
import { useState } from 'react';

interface LetterProps {
	title: string;
	tag: string;
	type: string;
	clicked: number;
}

const PopCards = () => {
	const total = 0b0;
	const news = 0b1;
	const liter = 0b10;

	const [mode, setMode] = useState(total);

	const letters: LetterProps[] = [
		{
			title: 'AXYZ에서 Flutter 앱 개발자, React웹 개발자 한분 씩을 모집합니다 가나다',
			tag: '시사',
			type: '뉴스',
			clicked: 523,
		},
				{
			title: 'AXYZ에서 Flutter 앱 개발자, React웹 개발자 한분 씩을 모집합니다 가나다',
			tag: '시사',
			type: '뉴스',
			clicked: 523,
		},
		{
			title: '하하',
			tag: '시사',
			type: '뉴스',
			clicked: 523,
		},
		{
			title: '호호',
			tag: '경제',
			type: '뉴스',
			clicked: 523,
		},
		{
			title: '후후',
			tag: '연애',
			type: '비문학',
			clicked: 523,
		},
	];

	return (
		<>
			<div className='flex flex-col w-full items-center'>
				<div className='flex flex-row w-full h-28 items-center text-gray-400 font-bold text-2xl text-end gap-x-16'>
					{mode == total ? (
						<div className='text-black'>
							<div onClick={() => setMode(total)}>🔥 이번 주 리딧 인기글</div>
						</div>
					) : (
						<div onClick={() => setMode(total)}>🔥 이번 주 리딧 인기글</div>
					)}
					{mode == news ? (
						<div className='text-black'>
							<div onClick={() => setMode(news)}> 뉴스 </div>
						</div>
					) : (
						<div onClick={() => setMode(news)}> 뉴스 </div>
					)}
					{mode == liter ? (
						<div className='text-black'>
							<div onClick={() => setMode(liter)}> 비문학 </div>
						</div>
					) : (
						<div onClick={() => setMode(liter)}> 비문학 </div>
					)}
				</div>
				<div className='flex flex-row w-full h-52 justify-start px-3 gap-x-5 flex-wrap'>
					{mode == total ? (
						<>
							{letters.map((letter, index) => (
								<Card key={index} className='flex flex-col w-64 justify-between rounded-3xl border-gray-400 border'>
									<div className='flex justify-end gap-2'>
										<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
											#{letter.type}
										</div>
										<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
											#{letter.tag}
										</div>
									</div>
									{/* <div className='text-start text-gray-400 text-sm'>마감일 | 2024.04.21</div> */}
									<div className='h-4/5 text-start font-bold py-2'>
										{letter.title.length <= 35 ? <div>{letter.title} </div> : <div>{letter.title.slice(0, 35)}...</div>}
									</div>
									<div className='text-end text-sm'>👀 조회수 {letter.clicked}</div>
								</Card>
							))}
						</>
					) : mode == news ? (
						<>
							{letters
								.filter((letter) => letter.type === '뉴스')
								.map((letter, index) => (
									<Card key={index} className='flex flex-col w-64 justify-between rounded-3xl border-gray-400 border'>
										<div className='flex justify-end gap-2'>
											<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
												#{letter.type}
											</div>
											<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
												#{letter.tag}
											</div>
										</div>
										{/* <div className='text-start text-gray-400 text-sm'>마감일 | 2024.04.21</div> */}
										<div className='h-4/5 text-start font-bold py-2'>
											{letter.title.length <= 35 ? (
												<div>{letter.title} </div>
											) : (
												<div>{letter.title.slice(0, 35)}...</div>
											)}
										</div>
										<div className='text-end text-sm'>👀 조회수 {letter.clicked}</div>
									</Card>
								))}
						</>
					) : (
						<>
							{letters
								.filter((letter) => letter.type === '비문학')
								.map((letter, index) => (
									<Card key={index} className='flex flex-col w-64 justify-between rounded-3xl border-gray-400 border'>
										<div className='flex justify-end gap-2'>
											<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
												#{letter.type}
											</div>
											<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
												#{letter.tag}
											</div>
										</div>
										{/* <div className='text-start text-gray-400 text-sm'>마감일 | 2024.04.21</div> */}
										<div className='h-4/5 text-start font-bold py-2'>
											{letter.title.length <= 35 ? (
												<div>{letter.title} </div>
											) : (
												<div>{letter.title.slice(0, 35)}...</div>
											)}
										</div>
										<div className='text-end text-sm'>👀 조회수 {letter.clicked}</div>
									</Card>
								))}
						</>
					)}
				</div>
			</div>
		</>
	);
};
export default PopCards;
