import { Card } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { articleList, PopArticleList } from '../../types/articleProps';
import { useAuthStore } from '../../store/auth';
import { useMutation } from 'react-query';

const PopCards = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	// 조회수 ++
	const hits = useMutation(async (id: number) => {
		await fetch(`${baseUrl}/article/hit/${id}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		});
	});
	const handlehits = async (id: number) => {
		try {
			await hits.mutateAsync(id);
		} catch (error) {}
	};

	const handleCardClick = (article: articleList | null) => {
		if(accessToken){

			navigate('/viewer', { state: { article } });
			handlehits(article?.id!);
		}
		};

	const [popArticles, setPopArticle] = useState<PopArticleList>();
	// 인기있는 아티클 받아오기
	const popArticleData = async () => {
		const data = await fetch(`${baseUrl}/article/hot`).then((response) => response.json());
		return data;
	};

	const { accessToken } = useAuthStore();
	useEffect(() => {
		popArticleData()
			.then((res) => {
				setPopArticle(res);
				setIsLoading(false);
			})
			.catch((_err) => {});
	}, []);

	const total = 0b0;
	const news = 0b1;
	const liter = 0b10;
	const [mode, setMode] = useState(total);

	const categoryStyles: { [key: string]: string } = {
		비문학: 'bg-blue-200 border border-blue-500',
		정치: 'bg-gray-200 border border-gray-400 text-black',
		경제: 'bg-green-200 border border-green-400 text-black',
		사회: 'bg-yellow-100 border-yellow-400 text-black',
		'생활/문화': 'bg-purple-200 border-purple-400 text-black',
		'IT/과학': 'bg-indigo-200 border-indigo-400 text-black',
		세계: 'bg-pink-200 border-pink-400 text-black',
		오피니언: 'bg-red-200 border-red-400 text-black',
	};

	function getCategoryStyle(categoryName: string) {
		return categoryStyles[categoryName] || 'bg-gray-200 text-gray-800';
	}

	return (
		<>
			<div className='flex flex-col h-1/3 w-full items-center'>
				<div className='flex flex-row w-full h-24 items-center text-gray-400 font-bold text-2xl text-end gap-x-16 '>
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
					{isLoading ? (
						<>
							<Card className='flex flex-col w-64 h-48 justify-between rounded-3xl border-gray-400 border hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'></Card>
							<Card className='flex flex-col w-64 h-48 justify-between rounded-3xl border-gray-400 border hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'></Card>
							<Card className='flex flex-col w-64 h-48 justify-between rounded-3xl border-gray-400 border hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'></Card>
							<Card className='flex flex-col w-64 h-48 justify-between rounded-3xl border-gray-400 border hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'></Card>
						</>
					) : (
						<>
							{mode == total ? (
								<>
									{popArticles?.articleList?.map((article, index) => (
										<Card
											key={index}
											className='flex flex-col w-64 h-48 justify-between rounded-3xl border-gray-400 border hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'
											onClick={() => {
												handleCardClick(article);
											}}
										>
											<div className='flex justify-end gap-2 h-1/5'>
												<div className='px-3 border border-tag-100 bg-tag-50 rounded-lg text-tag-100 text-sm flex flex-row items-center justify-center'>
													{article.type === 'NEWS' ? <>#뉴스</> : <>#비문학</>}
												</div>
												{article.type === 'NEWS' ? (
													<div
														className={`px-3 border rounded-lg  text-sm flex flex-row items-center justify-center ${getCategoryStyle(article.categoryName!)}`}
													>
														#{article.categoryName}
													</div>
												) : null}
											</div>
											{/* <div className={`h-3/5 text-${article.title.length < 10? 'center': 'start'} font-bold`}></div> */}
											<div className='h-3/5 text-start font-bold'>
												{article.title.length <= 28 ? (
													<div>{article.title} </div>
												) : (
													<div>{article.title.slice(0, 28)}...</div>
												)}
											</div>
											<div className='text-end text-sm'>👀 조회수 {article.hit}</div>
										</Card>
									))}
								</>
							) : mode == news ? (
								<>
									{popArticles?.newsList?.map((article, index) => (
										<Card
											key={index}
											className='flex flex-col w-64 h-48  justify-between rounded-3xl border-gray-400 border hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'
											onClick={() => {
												handleCardClick(article);
											}}
										>
											<div className='flex justify-end gap-2 h-1/5'>
												{/* <div className='px-3 border border-tag-100 bg-tag-50 rounded-lg text-tag-100 text-sm flex flex-row items-center justify-center'>
											{article.type === 'NEWS' ? <>#뉴스</> : <>#비문학</>}
										</div> */}
												{article.type === 'NEWS' ? (
													<div
														className={`px-3 border rounded-lg  text-sm flex flex-row items-center justify-center ${getCategoryStyle(article.categoryName!)}`}
													>
														#{article.categoryName}
													</div>
												) : null}
											</div>
											{/* <div className={`h-3/5 text-${article.title.length < 10? 'center': 'start'} font-bold`}></div> */}
											<div className='h-3/5 text-start font-bold'>
												{article.title.length <= 28 ? (
													<div>{article.title} </div>
												) : (
													<div>{article.title.slice(0, 28)}...</div>
												)}
											</div>
											<div className='text-end text-sm'>👀 조회수 {article.hit}</div>
										</Card>
									))}
								</>
							) : (
								<>
									{popArticles?.epigraphyList?.map((article, index) => (
										<Card
											key={index}
											className='flex flex-col w-64 h-48  justify-between rounded-3xl border-gray-400 border hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'
											onClick={() => handleCardClick(article)}
										>
											<div className='flex justify-end gap-2 h-1/5'>
												<div className='px-3 border border-tag-100 bg-tag-50 rounded-lg text-tag-100 text-sm flex flex-row items-center justify-center'>
													{article.type === 'NEWS' ? <>#뉴스</> : <>#비문학</>}
												</div>
												{article.type === 'NEWS' ? (
													<div
														className={`px-3 border rounded-lg  text-sm flex flex-row items-center justify-center ${getCategoryStyle(article.categoryName!)}`}
													>
														#{article.categoryName}
													</div>
												) : null}
											</div>
											<div className='h-3/5 text-start font-bold'>
												{article.title.length <= 28 ? (
													<div>{article.title} </div>
												) : (
													<div>{article.title.slice(0, 28)}...</div>
												)}
											</div>
											<div className='text-end text-sm'>👀 조회수 {article.hit}</div>
										</Card>
									))}
								</>
							)}
						</>
					)}
				</div>
			</div>
		</>
	);
};
export default PopCards;
