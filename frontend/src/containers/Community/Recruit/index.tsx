import { Card } from 'flowbite-react';
import Headers from '../../../components/Headers';
import CommunityRecruitHeader from './CommunityRecruitHeader';
import RecruitCondition from './RecruitCondition';

const Recruit = () => {
	return (
		<>
			<div className='w-full flex justify-center flex-col items-center h-full'>
				<Headers />
				<div className='flex flex-col w-3/5 h-full items-center '>
					<CommunityRecruitHeader />
					<div className='flex w-3/5 h-full flex-col gap-x-5'>
						<Card className=''>
							<RecruitCondition />
						</Card>
					</div>
				</div>
			</div>
		</>
	);
};

export default Recruit;
