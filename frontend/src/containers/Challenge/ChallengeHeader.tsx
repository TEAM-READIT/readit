import { Breadcrumb, BreadcrumbItem } from 'flowbite-react';
import { Link } from 'react-router-dom';

const ChallengeHeader = () => {
	return (
		<>
			<div className='flex flex-row w-full justify-between px-5 pb-10 items-center'>
				<div className=' w-full'>
					<Breadcrumb className=''>
						<BreadcrumbItem>
							<Link to='/'>홈</Link>
						</BreadcrumbItem>
						<BreadcrumbItem>
							<div className='hover:cursor-pointer'>챌린지</div>
						</BreadcrumbItem>
					</Breadcrumb>
					
					</div>
				</div>

		</>
	);
};

export default ChallengeHeader;
