import { useLocation } from 'react-router-dom';
import Headers from '../../components/Headers';
import GroupHeader from './GroupHeader';
import ProfileImage from '../../assets/images/skawkaks.png';
const Group = () => {
	const location = useLocation();
	const group = location.state?.group;
	return (
		<>
			<div className='w-full flex justify-center flex-col items-center h-screen'>
				<Headers />
				<div className='flex flex-col w-3/4 h-full justify-start  items-center'>
					<GroupHeader />
					<div className='flex w-full flex-row justify-start px-5 pb-5 gap-5'>
						<div className='flex w-full flex-row gap-2 '>
							<span className='text-2xl text-yellow-400'>
								<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
									<path
										fill='currentColor'
										d='M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14z'
									/>
								</svg>
							</span>
							<span className='font-semibold'>{group.writer}</span>
							<span className='material-symbols-outlined'>person</span>
							<span>
								{group.participant} / {group.maxparticipant}
							</span>
						</div>
					</div>
					<div className='w-full'>
						<div className='flex flex-row w-3/4 p-5 text-xl font-bold bg-[#E1EDFF] rounded-xl'>📢 공지 : </div>
					</div>
					<div className=' w-full p-5 flex flex-row justify-start gap-20 items-center '>
						<div className='flex flex-col'>
							<img src={ProfileImage} alt='사용자프로필' className='w-16 aspect-auto' />
							<div>dlrmsgkr</div>
							<div>1 / 3 </div>
						</div>
					</div>
					<div className='w-full flex flex-row gap-5'>
						<img src={ProfileImage} alt='프로필' className='w-16 aspect-auto' />
						<div className='flex flex-row gap-5 border border-black'>

						<div>글 읽은 시간 대충 어쩌구 저쩌구</div>
						<div className='flex justify-center items-center w-16 border  border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>{group.tag}</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Group;
