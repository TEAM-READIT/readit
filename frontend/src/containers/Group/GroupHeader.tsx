import { Breadcrumb, BreadcrumbItem, Button } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { communityProps } from '../../types/gropProps';

const GroupHeader = ({ myGroup }: { myGroup: communityProps }) => {
	const navigate = useNavigate();
	const handleRead4Commu = (categoryName:string, communityId:number) => {
		navigate('/essay', { state: { categoryName, communityId } });
		console.log(categoryName)
	};

	const detail = myGroup.communityDetail

	return (
		<>
			<div className='flex flex-row w-full justify-between px-5 pb-5 items-center'>
				<div className=' w-full'>
					<Breadcrumb className='pb-8'>
						<BreadcrumbItem>
							<Link to='/'>홈</Link>
						</BreadcrumbItem>
						<BreadcrumbItem>
							<Link to='/community'>커뮤니티</Link>
						</BreadcrumbItem>
						<BreadcrumbItem>
							<Link to='/group'>모임</Link>
						</BreadcrumbItem>
					</Breadcrumb>
					<div className='flex flex-row justify-between items-center w-full'>
						<div className='flex flex-row items-center gap-x-5'>
							<div className='text-xl font-semibold leading-tight text-gray-700'>{myGroup.communityDetail.title}</div>
							<div className='w-20 border border-tag-100 bg-tag-50 rounded-lg text-tag-100 text-sm'>
								#{detail.categoryName}
							</div>
							<div>주 {detail.articleCount} 개의 글을 읽습니다. </div>

							<div className='flex gap-2 '>
								<span className='text-2xl text-yellow-400'>
									<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
										<path
											fill='currentColor'
											d='M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14z'
										/>
									</svg>
								</span>
								<span className='font-semibold'>{detail.writerName}</span>
								<div className='flex gap-2'>
									<span className='material-symbols-outlined hover:cursor-pointer'>person</span>
									<span>
										{detail.currentParticipants} / {detail.maxParticipants}
									</span>
								</div>
							</div>
						</div>
						<div className='flex gap-3'>
							<Button className='border bg-blue-700 text-white border-blue-300 hover:bg-blue-800 '>
								<div className='flex items-center gap-2'>
									<span onClick={() => handleRead4Commu(detail.categoryName, detail.communityId)}>글 읽으러 가기</span>
								</div>
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full px-5 '>
				<div className='flex flex-row w-full p-3 text bg-[#E1EDFF] rounded-xl'>
					<div className='font-bold'>📢 공지</div>: {detail.notice}
				</div>
			</div>
		</>
	);
};

export default GroupHeader;
