import { Breadcrumb, BreadcrumbItem, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

const CommunityHeader = () => {

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
							<Link to='/community'>커뮤니티</Link>
						</BreadcrumbItem>
					</Breadcrumb>
					<div className='flex flex-row justify-between items-center w-full'>
						<h1 className='text-3xl font-semibold leading-tight text-gray-700'>모집 글 목록</h1>
						<div className='flex gap-3'>
							<Button className='border bg-blue-700 text-white border-blue-300 hover:bg-blue-800 '>
								<div className='flex items-center gap-2'>
									<span className='material-symbols-outlined text-[1.2rem]'>add</span>
									<span onClick={() => navigate('/recruit')}>새 모집 글 작성</span>
								</div>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default CommunityHeader