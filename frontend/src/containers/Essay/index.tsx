import Headers from '../../components/Headers';
import SearchFilter from './SearchFilter';
import EssayHeader from './EssayHeader';
import SearchList from './SearchList';
import { useEffect, useState } from 'react';
import { articleList } from '../../types/articleProps';

const Essay = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const [totalArticles, setTotalArticle] = useState<articleList[]>();

	//전체 아티클 조회
	const totalArticleData = async (filter: string) => {
		if (filter == '?') {
			const data = await fetch(`${baseUrl}/article/list`).then((response) => response.json());
			return data;
		} else {
			const queryParams = new URLSearchParams(filter);
			const data = await fetch(`${baseUrl}/article/list?${queryParams}`).then((response) => response.json());
			return data;
		}
	};

	// useEffect(() => {
	// 	totalArticleData(filter:string)
	// 		.then((res) => setTotalArticle(res))
	// 		.catch((err) => {
	// 			console.log('전체 아티클 받아오는거 에러');
	// 		});
	// }, []);

	const handleFilterChange = (filter: string) => {
		totalArticleData(filter)
			.then((res) => setTotalArticle(res))
			.catch((err) => {
				console.log('전체 글 목록 조회 or 필터링 된 글 불러오기 실패');
			});
		console.log(filter);
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
						{totalArticles ? <SearchList totalArticles={totalArticles} /> : null}
					</div>
				</div>
			</div>
		</>
	);
};

export default Essay;
