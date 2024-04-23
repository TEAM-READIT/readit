import { Button } from 'flowbite-react';

const Read = () => {
	const articles = [
		{
			title: '서울역서 KTX-무궁화 추돌…승객 287명 전원 하차 [지금뉴스]',
			date: '2024.04.18',
			tag: '시사',
		},
		{
			title: '서울역서 KTX-무궁화 추돌…승객 287명 전원 하차 [지금뉴스]',
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
				<div className='p-10 text-2xl font-bold flex'>내가 읽은 글</div>
				<div className='px-10 h-full flex flex-col justify-between gap-y-5'>
					{articles.map((article, index) => (
						<div
							key={index}
							className='border border-black w-full flex flex-row items-center justify-between p-10 rounded-xl'
						>
							<div className='flex flex-col gap-5'>
								<div className='font-bold text-xl'>{article.title}</div>
								<div className='flex flex-row justify-start gap-5'>
									<div className='text-gray-500'>{article.date}</div>
									<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
										#{article.tag}
									</div>
								</div>
							</div>
							<Button className='bg-primary-500 border w-1/6 border-black'>글 보러 가기</Button>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Read;
