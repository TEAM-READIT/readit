import Headers from '../../components/Headers';
import SearchFilter from './SearchFilter';
import EssayHeader from './EssayHeader';
import SearchList from './SearchList';
import { useCallback, useEffect, useRef, useState } from 'react';
import { articleList } from '../../types/articleProps';
import { useLocation } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import { useAuthStore } from '../../store/auth';

const Essay = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const { accessToken } = useAuthStore();

	const [filter, setFilter] = useState<string>('');
	const observerRef = useRef(null);
	const location = useLocation();
	const categoryName = location.state?.categoryName;
	const communityId = location.state?.communityId;

	// 한 페이지에 표시할 데이터(기사) 수 및 페이지 번호 설정
	const limit = 12;
	const [page, setPage] = useState<number | undefined>(0);
	const [totalArticles, setTotalArticle] = useState<{ articleList: articleList[]; hasNext: boolean }>();

	// 커뮤니티에서 카테고리가 지정된 경우 해당 필터 설정
	if (categoryName) setFilter(`categoryName=${categoryName}`);

	// 데이터를 가져오는 함수
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

	// 마지막 아티클 ID를 기반으로 페이지 설정
	useEffect(() => {
		if (totalArticles) {
			const lastArticleId = totalArticles?.articleList[totalArticles?.articleList?.length - 1]?.id;
			setPage(lastArticleId);
		} else {
			setPage(1);
		}
	}, [totalArticles]);

	// 무한 스크롤을 사용하여 데이터 가져오기
	const { isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
		'articles',
		({ pageParam = page }) =>
			totalArticleData(pageParam, filter)
				.then((res) => setTotalArticle(res))
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
				console.log('마지막 페이지에 도달했습니다');
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

	// 검색 필터 변경 시 처리하는 함수
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
