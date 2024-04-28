import ProfileImage from '../../assets/images/profile.png';
import { communityProps } from '../../types/gropProps';
import { Card } from 'flowbite-react';
import Member from './Member';

const Articles = ({ myGroup, open }: { myGroup: communityProps; open: () => void }) => {
	return (
		<>
			<div className='w-3/5 flex flex-col h-full gap-3'>
				<Member myGroup={myGroup} />
				<div className='flex gap-3 flex-col'>
					{myGroup.articleList.map((article, index) => (
						<div key={index}>
							<Card onClick={() => open()} className='hover:cursor-pointer'>
								<div className='w-full flex flex-row gap-10'>
									<div className='flex flex-col'>
										<img src={ProfileImage} alt='사용자프로필' className='w-16 aspect-auto' />
										{/* <img src={article.profile} alt='사용자프로필' className='w-16 aspect-auto' /> */}
										<div className='font-bold'>{article.memberName}</div>
									</div>
									<div className='flex flex-col gap-3'>
										<div className='flex flex-row gap-3 '>
											<div>글 읽은 시간 대충 어쩌구 저쩌구</div>
											<div className='flex justify-center items-center w-16 border  border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
												{article.categoryName}
											</div>
										</div>
										<div className='flex justify-start text-lg font-bold'>{article.title} </div>
										<div className='flex justify-start'>{article.summary} </div>
									</div>
								</div>
							</Card>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Articles;
