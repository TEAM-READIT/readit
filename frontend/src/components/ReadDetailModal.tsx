import { Card } from 'flowbite-react';
import { useLocation } from 'react-router-dom';
import Headers from './Headers';
import ReadDetailModalHeaders from './ReadDetailModalHeaders';

const ReadDetailModal = () => {
	const location = useLocation();
	const article = location.state?.article;
	return (
		<>
			<div className='w-full h-full flex justify-center flex-col items-center'>
				<Headers />
				<div className='flex flex-col w-3/5 justify-start items-center '>
					<ReadDetailModalHeaders />
					<div className='flex flex-col gap-10  w-full'>
						<div className='font-bold text-2xl'>{article.title}</div>
						<div className='text-start flex flex-col gap-5'>
							<Card className=''>
								{article.content.length > 750 ? <>{article.content.slice(0, 750)}...</> : <>{article.content}</>}
							</Card>
							<Card className=''>
								<div className='flex flex-col'>
									<div className='border-b border-b-grap-500 pb-2'>{article.summary}</div>
								</div>
								<div className='flex flex-row justify-between items-center'>
									<div className='flex flex-row items-center gap-1'>
										<span className='material-symbols-outlined'>subdirectory_arrow_right </span>{' '}
										<span>{article.feedback}</span>
									</div>
									<span>{article.score} / 100</span>
								</div>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ReadDetailModal;
