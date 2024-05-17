import { useCallback, useEffect, useRef, useState } from 'react';
import { articleList } from '../../../types/articleProps';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import { Card, Checkbox } from 'flowbite-react';
import { useAuthStore } from '../../../store/auth';

const SavedDetail = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const { accessToken } = useAuthStore();

	const saveobserverRef = useRef(null);
	const location = useLocation();
	const communityId = location.state?.communityId;

	// 한 페이지에 표시할 데이터(기사) 수 및 페이지 번호 설정
	const savelimit = 12;
	const [savepage, setSavePage] = useState<number>(0);
	const [savetotalArticles, setSaveTotalArticle] = useState<{ articleList: articleList[]; hasNext: boolean }>();

	// 전체 아티클 데이터를 가져오는 함수
	const savetotalArticleData = async (savepage: number, savefiltered: string) => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};
		const response = await fetch(
			`${baseUrl}/article/search/myarticle?${savefiltered}&cursor=${savepage}&limit=${savelimit}&isComplete=false`,
			{
				headers: headers,
			},
		);
		const data = await response.json();
		return data;
	};

	// 검색 필터 또는 페이지 변경 시 데이터 다시 불러오기
	const savefetchData = async (filtered: string) => {
		try {
			//페이지에 1번 넣고 데이터 호출
			const data = await savetotalArticleData(1, filtered);
			setSaveTotalArticle({ articleList: data.articleList, hasNext: data.hasNext });
			window.scrollTo(0, 0);
		} catch (error) {
		}
	};

	useEffect(() => {}, [savefetchData]);

	// 무한 스크롤을 사용하여 데이터 가져오기
	const { isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
		'articles',
		({ pageParam = savepage }) =>
			savetotalArticleData(pageParam, savefiltered)
				.then((res) => {
					if (savetotalArticles) {
						// 이전 페이지에 있는 기사들과 새로운 페이지에 있는 기사들을 합쳐서 업데이트합니다.
						setSaveTotalArticle((prevTotalArticles) => {
							let newArticleList = prevTotalArticles ? [...prevTotalArticles.articleList] : [];

							if (res.articleList && typeof res.articleList[Symbol.iterator] === 'function') {
								newArticleList.push(...res.articleList);
							}
							return {
								articleList: newArticleList,
								hasNext: res.hasNext,
							};
						});
					} else {
						setSaveTotalArticle(res);
					}
				})
				.catch((_err) => {}),
		{
			getNextPageParam: (_lastPage) => {
				if (savetotalArticles?.hasNext) {
					return savepage;
				}
			},
		},
	);

	// 마지막 아티클 ID를 기반으로 페이지 설정
	useEffect(() => {
		if (savetotalArticles) {
			if (savetotalArticles?.articleList?.length > 0) {
				const lastArticleId = savetotalArticles?.articleList[savetotalArticles?.articleList?.length - 1]?.id;
				setSavePage(lastArticleId!);
			} else {
				setSavePage(0);
			}
		}
	}, [savetotalArticles]);

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
	const handlesaveObserver = useCallback(
		(entries: any) => {
			const [target] = entries;
			if (target.isIntersecting) {
			}
		},
		[fetchNextPage, hasNextPage],
	);

	useEffect(() => {
		const element = saveobserverRef.current!;
		const option = { threshold: 0 };
		const observer = new IntersectionObserver(handlesaveObserver, option);
		observer.observe(element);
		return () => observer.unobserve(element);
	}, [fetchNextPage, hasNextPage, handlesaveObserver]);

	const navigate = useNavigate();

	const handlesaveCardClick = (article: articleList, communityId: number | null) => {
		navigate('/viewer', { state: { article, communityId } });
	};

	let savefiltered = '';

	const [searchType, setSearchType] = useState<string>('title');
	const [keyword, setKeyword] = useState('');
	const [category, setCategory] = useState('');
	const [ishit, setIshit] = useState<boolean>(false);
	const handlesaveApplyFilter = () => {
		if (searchType != '' && keyword) {
			savefiltered += `${searchType}=${keyword}&`;
		}
		if (ishit) {
			savefiltered += `hit=true&`;
		}
		if (category != '') {
			savefiltered += `category=${category}&`;
		}
		// 마지막 & 제거
		savefiltered = savefiltered.slice(0, -1);
		// 필터 넣어서 fetchData 요청
		savefetchData(savefiltered);
	};

	const handlesaveOrigin = (text: string) => {
		const newText = text?.replace(/<[^>]+>/g, '');
		return newText;
	};

	const handlesaveKeyPress = (e: any) => {
		if (e.key === 'Enter') {
			handlesaveApplyFilter();
		}
	};

	return (
		<>

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
													{/* <Checkbox onClick={() => setIsMember((prev) => !prev)} /> <div>내가 읽은 글 </div> */}
												</div>

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
													onKeyDown={handlesaveKeyPress}
												/>
												<div className='flex flex-row items-center gap-3'>
													<Checkbox onClick={() => setIshit((prev) => !prev)} /> <div>조회수로 정렬하기</div>
												</div>
											</div>

											<button
												className=' rounded-lg  text-center flex flex-row justify-center items-center text-sm h-[45px] border bg-blue-700 text-white border-blue-300 hover:bg-blue-800 '
												onClick={handlesaveApplyFilter}
											>
												<div className='flex items-center gap-2'>
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
						{isSuccess && savetotalArticles ? (
							<div className='flex flex-row w-full h-full justify-start px-4 p-3 gap-5 flex-wrap'>
								{savetotalArticles.articleList?.map((article, index) => (
									<Card
										key={index}
										className='flex flex-col w-64 h-72  justify-between rounded-3xl border-gray-400 border hover:cursor-pointer'
										onClick={() => handlesaveCardClick(article, communityId)}
									>
										<div className='flex flex-row justify-between text-center text-sm'>
											<div>👀 {article.hit}</div>
											{article.categoryName ? (
												<div className='px-3 border border-tag-100 bg-tag-50 rounded-lg text-tag-100 text-sm flex flex-row items-center justify-center'>
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
											{/* <div id='text' dangerouslySetInnerHTML={{ __html: article.content?.slice(0, 130)}}></div> */}
											<div className='text-sm'>{handlesaveOrigin(article.content)?.slice(0, 130)}</div>
										</div>
									</Card>
								))}
							</div>
						) : null}
					</div>
				</div>
				<div ref={saveobserverRef} className=''>
					<br />
					{savetotalArticles?.articleList?.length === 0
						? '읽고 있는 글이 없습니다'
						: isFetchingNextPage && hasNextPage
							? '읽고 있는 글을 로딩 중입니다'
							: ''}

					<br />
					<br />
				</div>
		</>
	);
};

export default SavedDetail;
