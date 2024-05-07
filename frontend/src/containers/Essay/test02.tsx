import Headers from '../../components/Headers';
import SearchFilter from './SearchFilter2';
import EssayHeader from './EssayHeader';
import SearchList from './SearchList';
import { useCallback, useEffect, useRef, useState } from 'react';
import { articleList } from '../../types/articleProps';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useAuthStore } from '../../store/auth';

const Essay02 = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const [filter, setFilter] = useState<string>(''); // 새로운 검색 결과 생기면 필터 초기화
	const observerRef = useRef(null);
	const location = useLocation();
	const categoryName = location.state?.categoryName;
	const communityId = location.state?.communityId;
	const { accessToken } = useAuthStore();

	const limit = 12; // 한 페이지에 필요한 데이터(기사) 개수
	const [page, setPage] = useState<number>(1); // 현재 데이터를 받아와야 하는 페이지

	// 커뮤니티에서 넘어와서 카테고리 목록이 있을 때
	if (categoryName) setFilter(`categoryName=${categoryName}`);

	// 데이터를 받아올 api, limit은 고정, page랑 filter만 변경
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
	const { data , isLoading, isError, } = useQuery<articleList[]>(['articles', page, filter], () => totalArticleData(page, filter));

	const totalArticles = data;

	const handleObserver = useCallback((entries: any) => {
		const [target] = entries;
		if (target.isIntersecting) {
			setPage((prev) => prev + 1);
			console.log('새로운 페이지에서 받아와야함');
		}
	}, []);

	useEffect(() => {
		totalArticleData(page, filter);
	}, [page, filter]);


	useEffect(() => {
		const element = observerRef.current!;
		const option = { threshold: 0 };

		const observer = new IntersectionObserver(handleObserver, option);
		observer.observe(element);
		return () => observer.unobserve(element);
	}, []);

	return (
		<>
			<div className='w-full h-full flex justify-center flex-col items-center'>
				<Headers />
				<div className='flex flex-col w-3/5 justify-start items-center '>
					<EssayHeader />
				</div>

				<div className='flex flex-row w-full justify-start gap-20 h-auto'>
					<div className='h-auto w-1/6 px-10'>
						<SearchFilter setFilter={setFilter} />
					</div>
					<div className='flex w-3/5 h-auto flex-col justify-start gap-5 '>
						{totalArticles ? <SearchList communityId={communityId} totalArticles={totalArticles} /> : null}
					</div>
				</div>
				<div ref={observerRef}>{isLoading && !isError ? '데이터 로딩중' : '남은 기사가 없습니다'}</div>
			</div>
		</>
	);
};

export default Essay02;
