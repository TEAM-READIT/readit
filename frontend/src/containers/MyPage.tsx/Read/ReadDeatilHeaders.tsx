import { Breadcrumb, BreadcrumbItem } from 'flowbite-react';
import { Link } from 'react-router-dom';

const ReadDetailHeaders = () => {
	return (
		<>
			<div className='flex flex-row w-full justify-between px-5 pb-10 items-center'>
				<div className=' w-full'>
					<Breadcrumb className='pb-8'>
						<BreadcrumbItem>
							<Link to='/'>홈</Link>
						</BreadcrumbItem>
						<BreadcrumbItem>
							<Link to='/mypage'>마이 페이지</Link>
						</BreadcrumbItem>
						<BreadcrumbItem>
							<div className='hover:cursor-pointer'>내가 읽은 글</div>
						</BreadcrumbItem>
					</Breadcrumb>
					<div className='flex flex-row justify-between items-center w-full py-0.5'>
						<h1 className='text-2xl font-semibold leading-tight text-gray-700 '>내가 읽은 글 목록</h1>
					</div>
				</div>
			</div>
		</>
	);
};

export default ReadDetailHeaders;
