import { Card } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { articleList, PoparticleList } from '../../types/articleProps';

const PopCards = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const navigate = useNavigate();
	// 아티클 담아서 상세 페이지로 보내주기 
	const handleCardClick = (article: articleList) => {
		navigate('/text', { state: { article } });
	};
	const [popArticles, setPopArticle] = useState<PoparticleList>();
	// 인기있는 아티클 받아오기
	const popArticleData = async () => {
		const data = await fetch(`${baseUrl}/article/hot`).then((response) => response.json());
		return data;
	};

	useEffect(() => {
		popArticleData()
			.then((res) => setPopArticle(res))
			.catch((err) => {
				console.log('아티클 받아오는거 에러');
			});
	}, []);

	const total = 0b0;
	const news = 0b1;
	const liter = 0b10;

	const [mode, setMode] = useState(total);

	return (
		<>
			<div className='flex flex-col w-full items-center pb-10'>
				<div className='flex flex-row w-full h-28 items-center text-gray-400 font-bold text-2xl text-end gap-x-16 '>
					{mode == total ? (
						<div className='text-black hover:cursor-pointer'>
							<div onClick={() => setMode(total)}>🔥 이번 주 리딧 인기글</div>
						</div>
					) : (
						<div className='hover:cursor-pointer' onClick={() => setMode(total)}>
							🔥 이번 주 리딧 인기글
						</div>
					)}
					{mode == news ? (
						<div className='text-black hover:cursor-pointer'>
							<div onClick={() => setMode(news)}> 뉴스 </div>
						</div>
					) : (
						<div className='hover:cursor-pointer' onClick={() => setMode(news)}>
							뉴스
						</div>
					)}
					{mode == liter ? (
						<div className='text-black hover:cursor-pointer'>
							<div onClick={() => setMode(liter)}> 비문학 </div>
						</div>
					) : (
						<div className='hover:cursor-pointer' onClick={() => setMode(liter)}>
							비문학
						</div>
					)}
				</div>
				<div className='flex flex-row w-full justify-start px-5 gap-5 flex-wrap'>
					{mode == total ? (
						<>
							{popArticles?.all.map((article, index) => (
								<Card
									key={index}
									className='flex flex-col w-64 h-44  justify-between rounded-3xl border-gray-400 border hover:cursor-pointer'
									onClick={() => handleCardClick(article)}
								>
									<div className='flex justify-end gap-2 h-1/5'>
										<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
											#{article.type}
										</div>
										{article.categoryName ? (
											<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
												#{article.categoryName}
											</div>
										) : null}
									</div>
									{/* <div className={`h-3/5 text-${article.title.length < 10? 'center': 'start'} font-bold`}></div> */}
									<div className='h-3/5 text-start font-bold'>
										{article.title.length <= 35 ? (
											<div>{article.title} </div>
										) : (
											<div>{article.title.slice(0, 35)}...</div>
										)}
									</div>
									<div className='text-end text-sm'>👀 조회수 {article.hits}</div>
								</Card>
							))}
						</>
					) : mode == news ? (
						<>
							{popArticles?.news
								.filter((article) => article.type === '뉴스')
								.map((article, index) => (
									<Card
										key={index}
										className='flex flex-col w-64 h-44  justify-between rounded-3xl border-gray-400 border'
										onClick={() => handleCardClick(article)}
									>
										<div className='flex justify-end gap-2 h-1/5'>
											<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
												#{article.type}
											</div>
											{article.categoryName ? (
												<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
													#{article.categoryName}
												</div>
											) : null}
										</div>
										<div className='h-3/5 text-start font-bold'>
											{article.title.length <= 35 ? (
												<div>{article.title} </div>
											) : (
												<div>{article.title.slice(0, 35)}...</div>
											)}
										</div>
										<div className='text-end text-sm'>👀 조회수 {article.hits}</div>
									</Card>
								))}
						</>
					) : (
						<>
							{popArticles?.epigraphy
								.filter((article) => article.type === '비문학')
								.map((article, index) => (
									<Card
										key={index}
										className='flex flex-col w-64 h-44  justify-between rounded-3xl border-gray-400 border'
										onClick={() => handleCardClick(article)}
									>
										<div className='flex justify-end gap-2 h-1/5'>
											<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
												#{article.type}
											</div>
											{article.categoryName ? (
												<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
													#{article.categoryName}
												</div>
											) : null}
										</div>
										<div className='h-3/5 text-start font-bold'>
											{article.title.length <= 35 ? (
												<div>{article.title} </div>
											) : (
												<div>{article.title.slice(0, 35)}...</div>
											)}
										</div>
										<div className='text-end text-sm'>👀 조회수 {article.hits}</div>
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
