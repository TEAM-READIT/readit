import { useLocation } from 'react-router-dom';
import Headers from '../../components/Headers';
import GroupHeader from './GroupHeader';
import ProfileImage from '../../assets/images/profile.png';
import { Card } from 'flowbite-react';
import useModal from '../../hooks/useModal';
import MemberDetail from './MemberDetail';
import Articles from './Articles';
const Group = () => {
	const location = useLocation();
	const group = location.state?.group;
	const [isOpen, open, close] = useModal();

	return (
		<>
			<div className='w-full flex justify-center flex-col items-center h-screen'>
				<Headers />
				<div className='flex flex-col w-3/4 h-full items-start'>
					<GroupHeader />

					<div className=' w-full p-5 flex flex-row justify-start gap-20 items-center '>
						<div className='flex flex-col'>
							<img src={ProfileImage} alt='사용자프로필' className='w-16 aspect-auto' />
							<div>dlrmsgkr</div>
							<div>1 / 3 </div>
						</div>
					</div>
					<Card className='w-3/5 hover:cursor-pointer' onClick={() => open()}>
						<Articles/>
					</Card>
				</div>
			</div>
			{isOpen ? <MemberDetail close={close} /> : null}
		</>
	);
};

export default Group;
