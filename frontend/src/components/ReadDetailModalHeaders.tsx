import { Breadcrumb, BreadcrumbItem } from 'flowbite-react';
import { Link } from 'react-router-dom';

const ReadDetailModalHeaders = () => {
	return (
		<>
			<div className='flex flex-row w-full justify-between px-5 pb-5+ items-center'>
				<div className=' w-full'>
					<Breadcrumb className='pb-8'>
						<BreadcrumbItem>
							<Link to='/'>홈</Link>
						</BreadcrumbItem>
						<BreadcrumbItem>
							<div className='hover:cursor-pointer'>글 요약 상세 보기</div>
						</BreadcrumbItem>
					</Breadcrumb>
				</div>
			</div>
		</>
	);
};

export default ReadDetailModalHeaders;
