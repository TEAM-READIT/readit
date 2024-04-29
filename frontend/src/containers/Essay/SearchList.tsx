import { Card } from 'flowbite-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { articleList } from '../../types/articleProps';
import { useEffect, useState } from 'react';

const SearchList = ({ totalArticles, communityId }: { totalArticles: articleList[]; communityId: number | null }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const handleCardClick = (article: articleList, communityId:number|null) => {
		navigate('/text', { state: { article, communityId } });
	};
	const articles = totalArticles;

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
