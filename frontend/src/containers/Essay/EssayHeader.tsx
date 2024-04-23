import { Breadcrumb, BreadcrumbItem, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

const EssayHeader = () => {
	return (
		<>
			<div className='flex flex-row w-full justify-between px-5 pb-10 items-center'>
				<div className=' w-full'>
					<Breadcrumb className='pb-8'>
						<BreadcrumbItem>
							<Link to='/'>홈</Link>
						</BreadcrumbItem>
						<BreadcrumbItem>
							<Link to='/essay'>글</Link>
						</BreadcrumbItem>
					</Breadcrumb>
					<div className='flex flex-row justify-between items-center w-full py-0.5'>
						<h1 className='text-3xl font-semibold leading-tight text-gray-700 '>전체 글 목록</h1>
					</div>
				</div>
			</div>
		</>
	);
};

export default EssayHeader;
