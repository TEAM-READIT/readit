import { useState, useEffect } from 'react';
import { aricleDetail, articleProps, communityProps } from '../../types/gropProps';
import Member from './Member';
import { useNavigate } from 'react-router-dom';

const Articles = ({ myGroup }: { myGroup: communityProps }) => {
	const navigate = useNavigate();
	const [sortedArticles, setSortedArticles] = useState<articleProps[]>([]);

	const handleArticle = (article: aricleDetail) => {
		navigate('/summary', { state: { article } });
	};

	const linechange = (text: string) => {
		return text?.replace(/\n/g, '\n\n');
	};
	
	useEffect(() => {
		const updatedArticles = myGroup.articleList.map((article) => ({
			articleDetail: {
				...article.articleDetail,
				content: linechange(article.articleDetail.content),
				articleId: article.articleDetail.articleId,
				title: article.articleDetail.title,
				completedAt: article.articleDetail.completedAt,
				summary: article.articleDetail.summary,
				score: article.articleDetail.score,
				feedback: article.articleDetail.feedback,
			},
			member: {
				...article.member,
			},
		}));
		setSortedArticles(updatedArticles.reverse());
	}, [myGroup.articleList]);

		const categoryStyles: { [key: string]: string } = {
			비문학: 'bg-blue-200 border border-blue-500',
			정치: 'bg-gray-200 border border-gray-400 text-black',
			경제: 'bg-green-200 border border-green-400 text-black',
			사회: 'bg-yellow-100 border-yellow-400 text-black',
			'생활/문화': 'bg-purple-200 border-purple-400 text-black',
			'IT/과학': 'bg-indigo-200 border-indigo-400 text-black',
			세계: 'bg-pink-200 border-pink-400 text-black',
			오피니언: 'bg-red-200 border-red-400 text-black',
		};

		function getCategoryStyle(categoryName: string) {
			return categoryStyles[categoryName] || 'bg-gray-200 text-gray-800';
	}
	

	return (
		<>
			<div className='w-3/5 flex flex-col h-full gap-3'>
				<Member myGroup={myGroup} />
				<div className='overflow-y-auto h-[500px]'>
					<div className='flex gap-3 flex-col'>
						{sortedArticles.length > 0 ? (
							<>
								{sortedArticles.map((article, index) => (
									<div key={index}>
										<div
											className='shadow-lg border border-gray-400 rounded-xl p-3 px-5 hover:cursor-pointer'
											onClick={() => handleArticle(article.articleDetail)}
										>
											<div className='w-full flex flex-row gap-7'>
												<div className='flex flex-col justify-center'>
													<img
														src={article.member.memberProfile}
														alt='사용자프로필'
														className='w-12 h-12 aspect-auto rounded-full'
													/>
													<div className=''>{article.member.memberName}</div>
												</div>
												<div className='flex flex-col gap-4'>
													<div className='flex flex-row gap-3 '>
														<div>{new Date(article.articleDetail.completedAt).toLocaleDateString()}</div>
														<div
															className={`flex justify-center items-center px-3 border rounded-lg text-sm  ${getCategoryStyle(myGroup.communityDetail.categoryName)}`}
														>
															#{myGroup.communityDetail.categoryName}
														</div>
													</div>
													<div>
														{article.articleDetail.title.length > 40 ? (
															<div className='flex justify-start font-bold'>
																{article.articleDetail.title.slice(0, 40)}...
															</div>
														) : (
															<div className='flex justify-start font-bold'>{article.articleDetail.title}</div>
														)}
														{article.articleDetail.summary.length > 40 ? (
															<div className='flex justify-start'>{article.articleDetail.summary.slice(0, 40)}...</div>
														) : (
															<div className='flex justify-start'>{article.articleDetail.summary}</div>
														)}
													</div>
												</div>
											</div>
										</div>
										{/* </Card> */}
									</div>
								))}
							</>
						) : (
							<>아직 읽은 글이 없습니다</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Articles;
