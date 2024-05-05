import Headers from '../../components/Headers';
import SearchFilter from './SearchFilter';
import EssayHeader from './EssayHeader';
import SearchList from './SearchList';
import { useCallback, useEffect, useRef, useState } from 'react';
import { articleList } from '../../types/articleProps';
import { useLocation } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';

const Essay = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const [filter, setFilter] = useState<string>(''); // 새로운 검색 결과 생기면 필터 초기화
	const observerRef = useRef(null);
	const location = useLocation();
	const categoryName = location.state?.categoryName;
	const communityId = location.state?.communityId;

	const limit = 12; // 한 페이지에 필요한 데이터(기사) 개수
	const [page, setPage] = useState<number>(1); // 현재 데이터를 받아와야 하는 페이지
	const [totalArticles, setTotalArticle] = useState<articleList[]>();

	// 커뮤니티에서 넘어와서 카테고리 목록이 있을 때 
	if (categoryName) setFilter(`categoryName=${categoryName}`);
	
	// 데이터를 받아올 api, limit은 고정, page랑 filter만 변경
	const totalArticleData = async (page: number, filter: string) => {
		const response = await fetch(`${baseUrl}/article/list?${filter}&cursor=${page}&limit=${limit}`).then((response) =>
			response.json(),
		);
		console.log(`${baseUrl}/article/list?${filter}&cursor=${page}&limit=${limit}`);
		return response;
	};

	// 무한스크롤
	const { isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
		'articles',
		({ pageParam = page }) =>
			totalArticleData(pageParam, filter)
				.then((res) => setTotalArticle(res))
				.catch((err) => {
					console.log(err);
				}),
		{
			getNextPageParam: (_lastPage, allPages) => {
				const nextPage = allPages.length + 1;
				return nextPage;
			},
		},
	);

	// 스크롤이 도달했을 때 다음 페이지 fetch
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

	const handleObserver = useCallback(
		(entries: any) => {
			const [target] = entries;
			if (target.isIntersecting) {
				console.log('마지막 페이지에 도달했습니다')
				// fetchNextPage();
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

	//전체 아티클 조회
	// const totalArticleData = async (filter: string) => {
	// 	const data = await fetch(`${baseUrl}/article/list?${filter}`).then((response) => response.json());
	// 	return data;
	// };
	// 검색 필터 변경 시 다시 받아오기
	const handleFilterChange = (filter: string) => {
		setFilter(filter);
		setPage(1);
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
						<SearchFilter handleFilterChange={handleFilterChange} />
					</div>
					<div className='flex w-3/5 h-auto flex-col justify-start gap-5 '>
						{isSuccess && totalArticles ? <SearchList communityId={communityId} totalArticles={totalArticles} /> : null}
					</div>
				</div>
				<div ref={observerRef}>
					{isFetchingNextPage && hasNextPage ? '기사를 로딩 중입니다' : '더 이상 남은 기사가 없습니다'}
				</div>
			</div>
		</>
	);
};

export default Essay;
