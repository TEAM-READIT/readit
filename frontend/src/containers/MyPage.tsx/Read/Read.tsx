import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { articleList } from '../../../types/articleProps';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../../store/auth';


const Read = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const navigate = useNavigate();
	const handleArticles = (articles: articleList[]) => {
		navigate('/mypage/read', { state: { articles } });
	};
	const handleArticle = (article: articleList) => {
		navigate('/summary', { state: { article } });
	};
	const { accessToken } = useAuthStore();

	const [articles, setArticles] = useState<articleList[]>();
	// 내가 읽은 글 받아오기

		const myArticleData = async () => {
			const headers = {
				Authorization: `Bearer ${accessToken}`,
			};
			const response = await fetch(`${baseUrl}/article/myarticle`, {
				headers: headers,
			});
			const data = await response.json();
			return data;
		};

	useEffect(() => {
		myArticleData()
			.then((res) => setArticles(res.articleList))
			.catch((_err) => {
				console.log('내가 읽은 글 받아오는거 에러');
			});
	}, []);

	// 상위 3개만 추출
	let top3Articles: articleList[] = [];
	if (articles && Array.isArray(articles)) {
		top3Articles = articles.reverse().slice(0, 3);
	}
	return (
		<>
			<div className='flex flex-col w-full border border-gray-200 pb-10 rounded-xl shadow-md'>
				<div className='flex flex-row justify-between items-center pr-10'>
					<div className='p-10 text-lg font-bold flex'>내가 읽은 글</div>

					<Button
						className='border bg-blue-700 text-white border-blue-300 hover:bg-blue-800'
						onClick={() => handleArticles(articles!)}
					>
						<span className='material-symbols-outlined text-[1.2rem]'>add</span>
						<span>더보기</span>
					</Button>
				</div>
				<div className='px-10 h-full flex flex-col justify-between gap-y-2'>
					{top3Articles && Array.isArray(top3Articles) ? (
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
						<></>
					)}
				</div>
			</div>
		</>
	);
};

export default Read;
