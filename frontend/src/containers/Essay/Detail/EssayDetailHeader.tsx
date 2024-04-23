import { Breadcrumb, BreadcrumbItem, Button } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';

const EssayDetailHeader = () => {
	const navigate = useNavigate();
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
						<BreadcrumbItem>
							<Link to='/text'>글 상세 페이지</Link>
						</BreadcrumbItem>
					</Breadcrumb>
					<div className='flex flex-row justify-between items-center w-full'>
						<h1 className='text-3xl font-semibold leading-tight text-gray-700'>글 상세 페이지</h1>
						<div className='flex gap-3'>
							<Button
								className='border bg-blue-700 text-white border-blue-300 hover:bg-blue-800'
								onClick={() => navigate('/essay')}
							>
								<div className='flex items-center gap-2'>
									<span>목록으로 이동</span>
								</div>
							</Button>
              
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EssayDetailHeader;
