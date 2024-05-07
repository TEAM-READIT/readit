import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { articleList } from '../../types/articleProps';
import { Card } from 'flowbite-react';

const SearchList = ({
	filter,
	totalArticles,
	communityId,
}: {
	filter: string;
	totalArticles: { articleList: articleList[]; hasNext: boolean };
	communityId: number | null;
}) => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const navigate = useNavigate();
	const [articles, setArticles] = useState<articleList[]>([]);

	// 새로운 기사가 로딩될 때마다 목록에 추가
	useEffect(() => {
		if (totalArticles && totalArticles.articleList) {
			setArticles((prevArticles) => [...prevArticles, ...totalArticles.articleList]);
		}
	}, [totalArticles.articleList]);

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
			<div className='flex flex-row w-full h-full justify-start p-3 gap-5 flex-wrap '>
				{articles?.map((article, index) => (
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
								{article.title.length <= 15 ? <div>{article.title} </div> : <div>{article.title.slice(0, 15)}...</div>}
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
		</>
	);
};

export default SearchList;
