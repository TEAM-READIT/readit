import ProfileImage from '../../assets/images/profile.png';
import { aricleDetail, communityProps } from '../../types/gropProps';
import Member from './Member';
import { useNavigate } from 'react-router-dom';

const Articles = ({ myGroup }: { myGroup: communityProps;}) => {
	const navigate = useNavigate();

	const handleArticle = (article:aricleDetail) => {
		navigate('/summary', { state: { article } });
	};

	console.log(myGroup.articleList)
return (
	<>
		<div className='w-3/5 flex flex-col h-full gap-3'>
			<Member myGroup={myGroup} />
			<div className='flex gap-3 flex-col'>
				{myGroup?.articleList?.length > 0 ? (
					<>
						{myGroup.articleList.map((article, index) => (
							<div key={index}>
								{/* <Card onClick={() => handleArticle(article)} className='hover:cursor-pointer p-0' > */}
								<div
									className='shadow-lg border border-gray-400 rounded-xl p-3 hover:cursor-pointer'
									onClick={() => handleArticle(article.articleDetail)}
								>
									<div className='w-full flex flex-row gap-10'>
										<div className='flex flex-col'>
											<img src={ProfileImage} alt='사용자프로필' className='w-12 aspect-auto' />
											{/* <img src={article.profile} alt='사용자프로필' className='w-16 aspect-auto' /> */}
											<div className=''>{article.member.memberName}</div>
										</div>
										<div className='flex flex-col gap-2'>
											<div className='flex flex-row gap-3 '>
												<div>글 읽은 시간 대충 어쩌구 저쩌구</div>
												<div className='flex justify-center items-center w-16 border  border-tag-100 bg-tag-50 rounded-lg text-tag-100 text-sm'>
													{myGroup.communityDetail.categoryName}
												</div>
											</div>
											<div>
												<div className='flex justify-start font-bold'>{article.articleDetail.title} </div>
												{article.articleDetail.summary.length > 45 ? (
													<div className='flex justify-start'>{article.articleDetail.summary.slice(0, 45)}... </div>
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
	</>
);
};

export default Articles;
