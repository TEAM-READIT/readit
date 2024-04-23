import { Button, Card } from 'flowbite-react';
import Headers from '../../../components/Headers';
import CommunityDetailHeader from './CommunityDetailHeaders';
import { useLocation, useNavigate } from 'react-router-dom';



interface GroupProps {
	id: number;
	title: string;
	tag: string;
	detail: string;
	date: string;
	// enddate:string;
	clicked: number;
	writer: string;
	participant: number;
	maxparticipant: number;
}

const Detail = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const group = location.state?.group; // 전달된 그룹 정보
	console.log(group);
	const handleClickGroup = (group: GroupProps) => {
		navigate('/group', { state: { group } });
	};
	return (
		<>
			<div className='w-full flex justify-center flex-col items-center h-screen'>
				<Headers />
				<div className='flex flex-col w-3/4 h-full justify-start  items-center '>
					<CommunityDetailHeader />
					<Card className='w-3/5 p-10'>
						<div className='flex flex-col gap-y-10'>
							<div className='flex flex-row justify-between items-center'>
								<div className='text-2xl font-bold'>{group.title}</div>
								<Button className='bg-green-500 '>
									<div className='flex items-center gap-2'>
										<span className='material-symbols-outlined text-[1.2rem]'>done</span>
										<span onClick={() => handleClickGroup(group)}>모임 가입하기</span>
									</div>
								</Button>
							</div>
							<div className='flex flex-row gap-5 items-center'>
								<div className='flex items-center gap-1.5'>
									<span className='text-2xl text-yellow-400'>
										<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
											<path
												fill='currentColor'
												d='M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14z'
											/>
										</svg>
									</span>
									<span className='font-semibold'>{group.writer}</span>
								</div>
								<div className='flex flex-row gap-1 items-center justify-center'>
									<span className='material-symbols-outlined'>person</span>
									<span>
										{group.participant}/{group.maxparticipant}
									</span>
								</div>
								<div className='flex flex-row gap-1 items-center justify-center'>
									<span className='material-symbols-outlined'>visibility</span>
									<span>{group.clicked}</span>
								</div>
							</div>

							<div>
								<div className='flex flex-row gap-x-3'>
									<div className='font-bold'>모임 주제 |</div>
									<div>{group.tag}</div>
								</div>
								<div className='flex flex-row gap-x-3'>
									<div className='font-bold'>모임 시작일 |</div>
									<div>{group.tag}</div>
								</div>
								<div className='flex flex-row gap-x-3'>
									<div className='font-bold'>모집 기간 |</div>
									<div>{group.tag}</div>
								</div>
							</div>
						</div>
						<div className='text-start text-xl pt-5 h-auto '>{group.detail}</div>
					</Card>
				</div>
			</div>
		</>
	);
};

export default Detail;
