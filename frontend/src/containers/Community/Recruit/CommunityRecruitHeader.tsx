import { Breadcrumb, BreadcrumbItem } from 'flowbite-react';
import { Link } from 'react-router-dom';

const CommunityRecruitHeader = () => {
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
							<Link to='/recruit'>모집 글 작성</Link>
						</BreadcrumbItem>
					</Breadcrumb>
					<div className='flex flex-row justify-between items-center w-full'>
						<h1 className='text-3xl font-semibold leading-tight text-gray-700'>모집 글 작성</h1>
					</div>
				</div>
			</div>
		</>
	);
};

export default CommunityRecruitHeader;
