import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { articleList } from '../../../types/articleProps';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../../store/auth';

const Read = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const navigate = useNavigate();
	const handleArticles = () => {
		navigate('/mypage/read');
	};
	const handlemyticles = () => {
		navigate('/mypage/temp');
	};
	const handleArticle = (article: articleList) => {
		navigate('/summary', { state: { article } });
	};
	const handlemyticle = (article: articleList) => {
		navigate('/viewer', { state: { article } });
	};
	const { accessToken } = useAuthStore();
	const [number, setNumber] = useState<number>(0);
	const [articles, setArticles] = useState<articleList[]>();
	const [myticles, setmyticles] = useState<articleList[]>();
	// 내가 읽은 글 받아오기

	const myArticleData = async () => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};
		const response = await fetch(`${baseUrl}/article/recent/myarticle?&isComplete=true`, {
			headers: headers,
		});
		const data = await response.json();
		return data;
	};
	const myticleData = async () => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};
		const response = await fetch(`${baseUrl}/article/recent/myarticle?&isComplete=false`, {
			headers: headers,
		});
		const data = await response.json();
		return data;
	};

	useEffect(() => {
		myArticleData()
			.then((res) => setArticles(res.articleList))
			.catch((_err) => {
			});
		myticleData()
			.then((res) => setmyticles(res.articleList))
			.catch((_err) => {
			});
	}, []);

	// 상위 3개만 추출
	let top3Articles: articleList[] = [];
	if (articles && Array.isArray(articles)) {
		top3Articles = articles.reverse().slice(0, 3);
	}
	let top3myticles: articleList[] = [];
	if (myticles && Array.isArray(myticles)) {
		top3myticles = myticles.reverse().slice(0, 3);
	}
	return (
		<>
			<div className='flex flex-col w-full border border-gray-200 pb-10 rounded-xl shadow-md'>
				<div className='flex flex-row justify-between items-center pr-10'>
					{number === 0 ? (
						<>
							<div className='flex flex-row p-10 gap-10'>
								<div className='text-lg font-bold flex hover:cursor-pointer'>내가 읽은 글</div>
								<div className='text-lg font-bold flex hover:cursor-pointer text-gray-400' onClick={() => setNumber(1)}>
									읽고 있는 글
								</div>
							</div>
							<Button
								className='border bg-blue-700 text-white border-blue-300 hover:bg-blue-800'
								onClick={() => handleArticles()}
							>
								<span className='material-symbols-outlined text-[1.2rem]'>add</span>
								<span>더보기</span>
							</Button>
						</>
					) : (
						<>
							<div className='flex flex-row p-10 gap-10'>
								<div
									className='text-lg font-bold text-gray-400 flex hover:cursor-pointer'
									onClick={() => setNumber(0)}
								>
									내가 읽은 글
								</div>
								<div className='text-lg font-bold flex hover:cursor-pointer'>읽고 있는 글</div>
							</div>
							<Button
								className='border bg-blue-700 text-white border-blue-300 hover:bg-blue-800'
								onClick={() => handlemyticles()}
							>
								<span className='material-symbols-outlined text-[1.2rem]'>add</span>
								<span>더보기</span>
							</Button>
						</>
					)}
				</div>
				<div className='px-10 h-full flex flex-col justify-between gap-y-2'>
					{number === 0 ? (
						<>
							{top3Articles.length > 0 && Array.isArray(top3Articles) ? (
								<>
									{top3Articles!.map((article, index) => (
										<div
											key={index}
											className='border border-gray-300 w-full flex flex-row items-center justify-between p-5 rounded-xl'
										>
											<div className='flex flex-col gap-2'>
												<div className='font-bold text-start'>{article.title}</div>
												<div className='flex flex-row justify-start gap-5'>
													{/* <div className='text-gray-500'>{article.completedAt}</div> */}
													<div className='text-gray-500'>
														{article.completedAt ? new Date(article.completedAt).toLocaleDateString() : '날짜 없음'}
													</div>
													<div className='flex justify-end gap-2 h-1/5'>
														<div className='px-3 border border-tag-100 bg-tag-50 rounded-lg text-tag-100 text-sm'>
															{article.type === 'NEWS' ? <>#뉴스</> : <>#비문학</>}
														</div>
														{article.type === 'NEWS' ? (
															<div className='px-3 border border-tag-100 bg-tag-50 rounded-lg text-tag-100 text-sm'>
																#{article.categoryName}
															</div>
														) : null}
													</div>
												</div>
											</div>
											<Button
												className='bg-primary-500 border w-1/6 border-black'
												onClick={() => {
													handleArticle(article);
												}}
											>
												글 보러 가기
											</Button>
										</div>
									))}
								</>
							) : (
								<>읽은 글이 없습니다</>
							)}
						</>
					) : (
						<>
							{top3myticles.length > 0 && Array.isArray(top3myticles) ? (
								<>
									{top3myticles!.map((article, index) => (
										<div
											key={index}
											className='border border-gray-300 w-full flex flex-row items-center justify-between p-5 rounded-xl'
										>
											<div className='flex flex-col gap-2'>
												<div className='font-bold text-start'>{article.title}</div>
												<div className='flex flex-row justify-start gap-5'>
													<div className='text-gray-500'>
														{article.completedAt ? new Date(article.completedAt).toLocaleDateString() : '읽는 중'}
													</div>
													<div className='flex justify-end gap-2 h-1/5'>
														<div className='px-3 border border-tag-100 bg-tag-50 rounded-lg text-tag-100 text-sm'>
															{article.type === 'NEWS' ? <>#뉴스</> : <>#비문학</>}
														</div>
														{article.type === 'NEWS' ? (
															<div className='px-3 border border-tag-100 bg-tag-50 rounded-lg text-tag-100 text-sm'>
																#{article.categoryName}
															</div>
														) : null}
													</div>
												</div>
											</div>
											<Button
												className='bg-primary-500 border w-1/6 border-black'
												onClick={() => {
													handlemyticle(article);
												}}
											>
												글 보러 가기
											</Button>
										</div>
									))}
								</>
							) : (
								<>읽고 있는 글이 없습니다</>
							)}
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default Read;
