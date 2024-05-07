import Headers from '../../components/Headers';
import SearchFilter from './SearchFilter';
import EssayHeader from './EssayHeader';
import { useCallback, useEffect, useRef, useState } from 'react';
import { articleList } from '../../types/articleProps';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import { useAuthStore } from '../../store/auth';
import { Card } from 'flowbite-react';

const Essay = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const [filter, setFilter] = useState<string>('');
	const { accessToken } = useAuthStore();
	const observerRef = useRef(null);
	const location = useLocation();
	const communityId = location.state?.communityId;
	const [isMember, setIsMember] = useState<boolean>(false);

	// 한 페이지에 표시할 데이터(기사) 수 및 페이지 번호 설정
	const limit = 12;
	const [page, setPage] = useState<number>(0);
	const [totalArticles, setTotalArticle] = useState<{ articleList: articleList[]; hasNext: boolean }>();

	// 전체 아티클 데이터를 가져오는 함수
	const totalArticleData = async (page: number, filter: string) => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};
		const response = await fetch(`${baseUrl}/article/search/article?${filter}&cursor=${page}&limit=${limit}`, {
			headers: headers,
		});
		const data = await response.json();
		return data;
	};

	// 내가 안읽은 글이 더 맞는거 같은데
	const unreadArticleData = async (page: number, filter: string) => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};
		const response = await fetch(`${baseUrl}/article/search/myarticle?${filter}&cursor=${page}&limit=${limit}`, {
			headers: headers,
		});
		const data = await response.json();
		return data;
	};

	// 안읽은 글 호출 함수
	const fetchUnreadData = async () => {
		try {
			const data = await unreadArticleData(1, filter);
			setTotalArticle({ articleList: data.articleList, hasNext: data.hasNext });
			window.scrollTo(0, 0);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	// 검색 필터 또는 페이지 변경 시 데이터 다시 불러오기
	const fetchData = async () => {
		try {
			const data = await totalArticleData(1, filter);
			setTotalArticle({ articleList: data.articleList, hasNext: data.hasNext });
			window.scrollTo(0, 0);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	// 필터가 바뀌면 fetchData
	useEffect(() => {
		fetchData();
	}, [filter]);


	// 내가 읽은 글 누를 때 마다 렌더링
	useEffect(() => {
		if (isMember) {
			fetchUnreadData();
		} else {
			fetchData();
		}
	}, [isMember]);

	// 무한 스크롤을 사용하여 데이터 가져오기
	const { isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
		'articles',
		({ pageParam = page }) =>
			totalArticleData(pageParam, filter)
				.then((res) => {
					if (totalArticles) {
						// 이전 페이지에 있는 기사들과 새로운 페이지에 있는 기사들을 합쳐서 업데이트합니다.
						setTotalArticle((prevTotalArticles) => ({
							articleList: [...prevTotalArticles!.articleList, ...res.articleList],
							hasNext: res.hasNext,
						}));
					} else {
						setTotalArticle(res);
					}
				})
				.catch((err) => {
					console.log(err);
				}),
		{
			getNextPageParam: (_lastPage) => {
				if (totalArticles?.hasNext) {
					return page;
				}
			},
		},
	);

	// 마지막 아티클 ID를 기반으로 페이지 설정
	useEffect(() => {
		if (totalArticles) {
			const lastArticleId = totalArticles?.articleList[totalArticles?.articleList?.length - 1]?.id;
			setPage(lastArticleId!);
		} else {
			setPage(0);
		}
	}, [totalArticles]);

	// 스크롤 이벤트 핸들러
	useEffect(() => {
		let fetching = false;
		const handleScroll = async (e: any) => {
			const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
			if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
				fetching = true;
				if (hasNextPage) await fetchNextPage();
				fetching = false;
			}
		};
		document.addEventListener('scroll', handleScroll);
		return () => {
			document.removeEventListener('scroll', handleScroll);
		};
	}, [fetchNextPage, hasNextPage]);

	// 관찰자 설정
	const handleObserver = useCallback(
		(entries: any) => {
			const [target] = entries;
			if (target.isIntersecting) {
			}
		},
		[fetchNextPage, hasNextPage],
	);

	useEffect(() => {
		const element = observerRef.current!;
		const option = { threshold: 0 };
		const observer = new IntersectionObserver(handleObserver, option);
		observer.observe(element);
		return () => observer.unobserve(element);
	}, [fetchNextPage, hasNextPage, handleObserver]);

	const navigate = useNavigate();

	const hits = async (articleId: number) => {
		const data = await fetch(`${baseUrl}/article/hits/${articleId}`).then((response) => response.json());
		return data;
	};

	const handleCardClick = (article: articleList, communityId: number | null) => {
		navigate('/text', { state: { article, communityId } });
		hits(article.id!);
	};

	return (
		<>
			<div className='w-full h-full flex justify-center flex-col items-center'>
				<Headers />
				<div className='flex flex-col w-3/5 justify-start items-center '>
					<EssayHeader />
				</div>

				<div className='flex flex-row w-full justify-start gap-20 h-auto'>
					<div className='h-auto w-1/6 px-10'>
						<SearchFilter setFilter={setFilter} setIsMember={setIsMember} />
					</div>
					<div className='flex w-4/6 h-auto flex-col justify-start gap-5 '>
						{isSuccess && totalArticles ? (
							<div className='flex flex-row w-full h-full justify-start px-4 p-3 gap-5 flex-wrap'>
								{totalArticles.articleList?.map((article, index) => (
									<Card
										key={index}
										className='flex flex-col w-64 h-72  justify-between rounded-3xl border-gray-400 border hover:cursor-pointer'
										onClick={() => handleCardClick(article, communityId)}
									>
										<div className='flex flex-row justify-between text-center text-sm'>
											<div>👀 {article.hit}</div>
											{article.categoryName ? (
												<div className='w-16 border border-tag-100 bg-tag-50 rounded-md text-tag-100 text-sm'>
													{article.categoryName}
												</div>
											) : null}
										</div>
										<div className='flex flex-col h-4/5 text-start gap-y-2'>
											<div className='text-l border-gray-200 border-b  font-bold'>
												{article.title.length <= 14 ? (
													<div>{article.title} </div>
												) : (
													<div>{article.title.slice(0, 14)}...</div>
												)}
											</div>
											<div className='text-sm'>
												{article.content.length <= 120 ? (
													<div>{article.content} </div>
												) : (
													<div>{article.content.slice(0, 120)}...</div>
												)}
											</div>
										</div>
									</Card>
								))}
							</div>
						) : null}
					</div>
				</div>
				<div ref={observerRef}>
					<br />
					{totalArticles?.articleList?.length === 0
						? '검색하려는 기사가 없습니다'
						: isFetchingNextPage && hasNextPage
							? '기사를 로딩 중입니다'
							: '더 이상 남은 기사가 없습니다'}

					<br />
					<br />
				</div>
			</div>
		</>
	);
};

export default Essay;
