import { Card } from 'flowbite-react';
import { useLocation } from 'react-router-dom';
import {articleList} from '../../types/articleProps';
import { useEffect, useState } from 'react';

const SearchList = (totalArticles: {totalArticles:articleList[]}) => {
	const location = useLocation();

	const articles: articleList[] = location.state?.articles;

	return (
		<>
			<div className='flex flex-row w-full h-full justify-start p-3 gap-5 flex-wrap '>
				{articles?.map((article, index) => (
					<Card
						key={index}
						className='flex flex-col w-64 h-72  justify-between rounded-3xl border-gray-400 border hover:cursor-pointer'
					>
						<div className='flex flex-row justify-between text-center text-sm'>
							<div>👀 {article.hits}</div>
							{article.categoryName ? (
								<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
									#{article.categoryName}
								</div>
							) : null}
						</div>
						<div className='flex flex-col h-4/5 text-start font-bold gap-y-2'>
							<div className='text-l border-gray-200 border-b'>
								{article.title.length <= 15 ? <div>{article.title} </div> : <div>{article.title.slice(0, 15)}...</div>}
							</div>
							<div className='text-sm'>
								{article.content.length <= 130 ? (
									<div>{article.content} </div>
								) : (
									<div>{article.content.slice(0, 130)}...</div>
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
