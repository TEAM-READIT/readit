import { Breadcrumb, BreadcrumbItem, Button } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const GroupHeader = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const group = location.state?.group;
	console.log(group);
	return (
		<>
			<div className='flex flex-row w-full justify-between px-5 pb-10 items-center'>
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
							<div className='text-3xl font-semibold leading-tight text-gray-700'>{group.title}</div>
							<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>#{group.tag}</div>
							<div>주 {group.id} 개의 글을 읽습니다. </div>
						</div>
						<div className='flex gap-3'>
							<Button className='border bg-blue-700 text-white border-blue-300 hover:bg-blue-800 '>
								<div className='flex items-center gap-2'>
									<span onClick={() => navigate('/recruit')}>글 읽으러 가기</span>
								</div>
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className='flex w-full flex-row justify-start px-5 pb-5 gap-5'>
				<div className='flex w-full flex-row gap-2 '>
					<span className='text-2xl text-yellow-400'>
						<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
							<path
								fill='currentColor'
								d='M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14z'
							/>
						</svg>
					</span>
					<span className='font-semibold'>{group.writer}</span>
					<span className='material-symbols-outlined'>person</span>
					<span>
						{group.participant} / {group.maxparticipant}
					</span>
				</div>
			</div>
			<div className='w-full'>
				<div className='flex flex-row w-3/5 p-5 text-xl font-bold bg-[#E1EDFF] rounded-xl'>📢 공지 : </div>
			</div>
		</>
	);
};

export default GroupHeader;
