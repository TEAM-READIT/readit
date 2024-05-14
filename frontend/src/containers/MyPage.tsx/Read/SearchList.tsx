import { Card } from 'flowbite-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Article {
	articleId: number;
	title: string;
	type: string;
	content: string;
	categoryName?: string;
	hit: number;
	reporter?: string;
}

const SearchList = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const articles: Article[] = location.state?.articles;

	const handleCard = (article: Article) => {
		navigate('/summary', { state: { article } });
	};

	return (
		<>
			<div className='flex flex-row w-full h-full justify-start p-3 gap-5 flex-wrap '>
				{articles ? (
					<>
						{articles?.map((article, index) => (
							<Card
								key={index}
								className='flex flex-col w-64 h-72  justify-between rounded-3xl border-gray-400 border hover:cursor-pointer'
								onClick={() => handleCard(article)}
							>
								<div className='flex flex-row justify-between text-center text-sm'>
									<div>👀 {article.hit}</div>
									{article.categoryName ? (
										<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
											#{article.categoryName}
										</div>
									) : null}
								</div>
								<div className='flex flex-col h-4/5 text-start font-bold gap-y-2'>
									<div className='text-l border-gray-200 border-b'>
										{article?.title?.length <= 13 ? (
											<div>{article.title} </div>
										) : (
											<div>{article.title.slice(0, 13)}...</div>
										)}
									</div>
									<div className='text-sm font-normal'>
										{/* {article?.content?.length <= 130 ? (
											<div>{article.content} </div>
										) : (
											<div>{article.content?.slice(0, 130)}...</div>
										)} */}
										<div id='text' dangerouslySetInnerHTML={{ __html: article.content?.slice(0, 130) }}></div>
									</div>
								</div>
							</Card>
						))}
					</>
				) : (
					<>읽은 글이 없습니다</>
				)}
			</div>
		</>
	);
};

export default SearchList;
