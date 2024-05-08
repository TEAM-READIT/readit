import Headers from '../../components/Headers';
import EssayHeader from './EssayHeader';
import { useCallback, useEffect, useRef, useState } from 'react';
import { articleList } from '../../types/articleProps';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInfiniteQuery, useMutation } from 'react-query';
import { useAuthStore } from '../../store/auth';
import { Card, Checkbox } from 'flowbite-react';

const Essay = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
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
	const totalArticleData = async (page: number, filtered: string) => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};
		const response = await fetch(`${baseUrl}/article/search/article?${filtered}&cursor=${page}&limit=${limit}`, {
			headers: headers,
		});
		const data = await response.json();
		return data;
	};

	// 내가 안읽은 글이 더 맞는거 같은데
	const unreadArticleData = async (page: number, filtered: string) => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};
		const response = await fetch(`${baseUrl}/article/search/myarticle?${filtered}&cursor=${page}&limit=${limit}`, {
			headers: headers,
		});
		const data = await response.json();
		return data;
	};

	// 안읽은 글 호출 함수
	const fetchUnreadData = async (filtered: string) => {
		try {
			const data = await unreadArticleData(1, filtered);
			console.log(data)
			setTotalArticle({ articleList: data.articleList, hasNext: data.hasNext });
			window.scrollTo(0, 0);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	// 검색 필터 또는 페이지 변경 시 데이터 다시 불러오기
	const fetchData = async (filtered: string) => {
		try {
			const data = await totalArticleData(1, filtered);
			setTotalArticle({ articleList: data.articleList, hasNext: data.hasNext });
			window.scrollTo(0, 0);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};


	// 내가 읽은 글 누를 때 마다 렌더링
	useEffect(() => {
		if (isMember) {
			fetchUnreadData(filtered);
			console.log(filtered)
			console.log('내가 읽은 글 ')
		} else {
			fetchData(filtered);
		}
	}, [isMember]);

	useEffect(() => {}, [fetchData, fetchUnreadData]);

	// 무한 스크롤을 사용하여 데이터 가져오기
	const { isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
		'articles',
		({ pageParam = page }) =>
			totalArticleData(pageParam, filtered)
				.then((res) => {
					if (totalArticles) {
						// 이전 페이지에 있는 기사들과 새로운 페이지에 있는 기사들을 합쳐서 업데이트합니다.
						setTotalArticle((prevTotalArticles) => {
							let newArticleList = prevTotalArticles ? [...prevTotalArticles.articleList] : [];

							if (res.articleList && typeof res.articleList[Symbol.iterator] === 'function') {
								newArticleList.push(...res.articleList);
							} else {
								console.error('res.articleList is not iterable');
							}

							return {
								articleList: newArticleList,
								hasNext: res.hasNext,
							};
						});
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

	// 조회수 ++
	const hits = useMutation(async (id:number) => {
		const response = await fetch(`${baseUrl}/article/hit/${id}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		});
		console.log(response)
	});
	const handlehits = async (id:number) => {
		try {
			await hits.mutateAsync(id);
		} catch (error) {
			console.error('', error);
		}
	};


	const handleCardClick = (article: articleList, communityId: number | null) => {
		navigate('/text', { state: { article, communityId } });
		handlehits(article.id!);
	};

	let filtered = '';

	const [searchType, setSearchType] = useState<string>('title');
	const [keyword, setKeyword] = useState('');
	const [category, setCategory] = useState('');
	const [ishit, setIshit] = useState<boolean>(false);
	const handleApplyFilter = () => {
		console.log('검색버튼 누름 ')
		if (searchType != '' && keyword) {
			filtered += `${searchType}=${keyword}$`;
		}
		if (ishit) {
			filtered += `hit=true$`;
		}
		// if (filter.isMember) {
		// 	filtered += `isMember=true$`;
		// }
		if (category != '') {
			filtered += `category=${category}$`;
		}
		// 마지막 & 제거
		filtered = filtered.slice(0, -1);
		console.log(filtered)
		fetchData(filtered);
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
						{/* <SearchFilter setFilter={setFilter} setIsMember={setIsMember} /> */}
						<div className='w-full h-full'>
							<div className='fixed top-50'>
								<div className='flex items-start h-full flex-row'>
									<Card>
										<div className='w-full flex flex-col gap-y-5'>
											<p className='font-semibold text-md border-b-2 border-gray-200 mb-2 pb-1'>검색 필터</p>
											<div className='flex flex-col gap-4'>
												<div className='flex flex-row items-center gap-10'>
													<Checkbox onClick={() => setIshit((prev) => !prev)} /> <div>조회수</div>
												</div>
												<div className='flex flex-row items-center gap-10'>
													<Checkbox onClick={() => setIsMember((prev) => !prev)} /> <div>내가 읽은 글 </div>
												</div>
												<select name='category' className='select' onChange={(e) => setSearchType(e.target.value)}>
													<option value='title'>제목</option>
													<option value='content'>내용</option>
													<option value='writerName'>작성자</option>
												</select>
												<input
													type='text'
													name='keyword'
													placeholder='검색어'
													className='input'
													onChange={(e) => setKeyword(e.target.value)}
												/>
												<select name='category' className='select' onChange={(e) => setCategory(e.target.value)}>
													<option value=''>카테고리 선택</option>
													<option value='비문학'>비문학</option>
													<option value='정치'>정치</option>
													<option value='경제'>경제</option>
													<option value='사회'>사회</option>
													<option value='생활/문화'>생활/문화</option>
													<option value='IT/과학'>IT/과학</option>
													<option value='세계'>세계</option>
													<option value='오피니언'>오피니언</option>
												</select>
											</div>

											<button className=' rounded-lg  text-center flex flex-row justify-center items-center text-sm h-[45px] border bg-blue-700 text-white border-blue-300 hover:bg-blue-800 '>
												<div className='flex items-center gap-2' onClick={handleApplyFilter}>
													<span className='material-symbols-outlined text-[1.2rem]'>search</span>
													<span>검색</span>
												</div>
											</button>
										</div>
									</Card>
								</div>
							</div>
						</div>
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