import Headers from '../../../components/Headers';
import CommunityRecruitHeader from './CommunityRecruitHeader';
import RecruitCondition from './RecruitCondition';
import RecruitText from './RecruitText';

const Recruit = () => {
	return (
		<>
			<div className='w-full flex justify-center flex-col items-center h-screen'>
				<Headers />
				<div className='flex flex-col w-3/5 h-full items-center '>
					<CommunityRecruitHeader />
					<div className='flex w-full h-full flex-col gap-5'>
						<RecruitCondition />
						<RecruitText />
					</div>
				</div>
			</div>
		</>
	);
};

export default Recruit;
