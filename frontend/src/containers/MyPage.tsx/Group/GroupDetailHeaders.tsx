import { Breadcrumb, BreadcrumbItem } from 'flowbite-react';
import { Link } from 'react-router-dom';

const GroupDetailHeaders = () => {
	return (
		<>
			<div className='flex flex-col w-3/5 h-full justify-start  items-center '>
				<div className='flex flex-row w-full justify-between px-5 items-center'>
					<div className=' w-full'>
						<Breadcrumb className='pb-8'>
							<BreadcrumbItem>
								<Link to='/'>홈</Link>
							</BreadcrumbItem>
							<BreadcrumbItem>
								<Link to='/mypage'>마이 페이지</Link>
							</BreadcrumbItem>
							<BreadcrumbItem>
								<div className='hover:cursor-pointer'>참여중인 모임</div>
							</BreadcrumbItem>
						</Breadcrumb>
					</div>
				</div>
			</div>
		</>
	);
};

export default GroupDetailHeaders;
