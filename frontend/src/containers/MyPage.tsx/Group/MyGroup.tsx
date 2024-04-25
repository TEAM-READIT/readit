import { Button } from 'flowbite-react';


const MyGroup = () => {
	const groups = [
		{
			title: '저와 같이 심도 있는 토론 하실 분',
			date: '2024.04.18',
			tag: '시사',
		},
		{
			title: '제 37회 정기 독서 토론',
			date: '2024.04.18',
			tag: '시사',
		},
		{
			title: '서울역서 KTX-무궁화 추돌…승객 287명 전원 하차 [지금뉴스]',
			date: '2024.04.18',
			tag: '시사',
		},
	];
	return (
		<>
			<div className='flex flex-col w-full'>
				<div className='flex flex-row justify-between items-center pr-10'>
					<div className='p-10 text-2xl font-bold flex'>참여 중인 모임</div>
					<Button className='border bg-blue-700 text-white border-blue-300 hover:bg-blue-800'>
						<span className='material-symbols-outlined text-[1.2rem]'>add</span>
						<span>더보기</span>
					</Button>
				</div>
				<div className='px-10 h-full flex flex-col justify-between gap-y-5'>
					{groups.map((group, index) => (
						<div
							key={index}
							className='border border-gray-300 w-full flex flex-row items-center justify-between p-5 rounded-xl'
						>
							<div className='flex flex-col gap-5'>
								<div className='font-bold text-xl'>{group.title}</div>
								<div className='flex flex-row justify-start gap-5'>
									<div className='text-gray-500'>{group.date}</div>
									<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
										#{group.tag}
									</div>
								</div>
							</div>
							<Button className='bg-primary-500 border border-black'>모임 페이지 이동하기</Button>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default MyGroup;
