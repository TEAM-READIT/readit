import { Button, Card } from 'flowbite-react';
import Headers from '../../../components/Headers';
import CommunityDetailHeader from './CommunityDetailHeaders';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useAuthStore } from '../../../store/auth';
import useUserStore from '../../../store/user';
import useModal from '../../../hooks/useModal';
import Login from '../../MainPage/Login/Login';

interface GroupProps {
	communityId: number;
	title: string;
	categoryName: string;
	content: string;
	startAt: Date;
	endAt: Date;
	hit: number;
	writerName: string;
	participants: number;
	maxparticipants: number;
}

const Detail = () => {
	const { accessToken } = useAuthStore();
	const [isOpen, open, close] = useModal();

	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const location = useLocation();
	const navigate = useNavigate();
	const community = location.state?.community;

	const communityPost = useMutation(async () => {
		await fetch(`${baseUrl}/community/${community.communityId}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		});
	});
	const handleJoin = async () => {
		try {
			await communityPost.mutateAsync();
		} catch (error) {
			// if (error instanceof Response && error.status == 409) {
			// 	alert('이미 가입한 모임입니다.');
			// 	navigate(-1);
			// } else {
			// 	alert('error');
			// }
		}
	};
	const handleClickGroup = (community: GroupProps) => {
		if (accessToken) {
			navigate('/group', { state: { community } });
			handleJoin();
		} else {
			open();
		}
	};

	const { id } = useUserStore();

	return (
		<>
			<div className='w-full flex justify-center flex-col items-center h-full'>
				<Headers />
				<div className='flex flex-col w-3/5 h-full justify-start  items-center '>
					<CommunityDetailHeader />
					{community ? (
						<Card className='w-full p-5'>
							<div className='flex flex-col gap-y-5'>
								<div className='flex flex-row justify-between items-center'>
									<div className='text-2xl font-bold pb-5'>{community.title}</div>
									{community.currentParticipants >= community.maxParticipants ? null : (
										<>
											{community.writerId === id ? null : (
												<Button className='border border-blue-800 text-blue-800 bg-transparent hover:bg-blue-900 hover:text-white' onClick={() => handleClickGroup(community)}>
													<div className='flex items-center gap-2'>
														<span className='material-symbols-outlined text-[1.2rem]'>done</span>
														<span>모임 가입하기</span>
													</div>
												</Button>
											)}
										</>
									)}
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
										<span className='font-semibold'>{community.writerName}</span>
									</div>
									<div className='flex flex-row gap-1 items-center justify-center'>
										<span className='material-symbols-outlined'>person</span>
										<span>
											{community.currentParticipants}/{community.maxParticipants}
										</span>
									</div>
									<div className='flex flex-row gap-1 items-center justify-center'>
										<span className='material-symbols-outlined'>visibility</span>
										<span>{community.hits}</span>
									</div>
								</div>

								<div>
									<div className='flex flex-row gap-x-3'>
										<div className='font-bold'>모임 주제 |</div>
										<div>{community.categoryName}</div>
									</div>
									<div className='flex flex-row gap-x-3'>
										<div className='font-bold'>모임 시작일 |</div>
										<div>{new Date(community.startAt).toLocaleDateString()}</div>
									</div>
									<div className='flex flex-row gap-x-3'>
										<div className='font-bold'>모집 기간 |</div>
										<div>~ {new Date(community.endAt).toLocaleDateString()}</div>
									</div>
								</div>
							</div>
							<div className='text-start pt-5 h-auto '>{community.content}</div>
						</Card>
					) : null}
				</div>
			</div>
			{isOpen ? <Login close={close} /> : null}
		</>
	);
};

export default Detail;
