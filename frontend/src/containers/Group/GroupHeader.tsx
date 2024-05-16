import { Breadcrumb, BreadcrumbItem, Button, Modal } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { communityProps } from '../../types/gropProps';
import { useAuthStore } from '../../store/auth';
import { useEffect, useState } from 'react';
import useStore from '../../store';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

interface GroupHeader {
	myGroup: communityProps;
	setnoticebody: React.Dispatch<React.SetStateAction<string>>;
	handlenoticePost: () => Promise<void>;
	noticebody: string;
}
const GroupHeader = ({ myGroup, setnoticebody, handlenoticePost, noticebody }: GroupHeader) => {
	const navigate = useNavigate();
	const { setLastfilter } = useStore();
	const handleRead4Commu = (categoryName: string, communityId: number) => {
		setLastfilter('')
		navigate('/essay', { state: { categoryName, communityId } });
	};

	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const { accessToken } = useAuthStore();
	const [modalOpen, setModalOpen] = useState(false);
	const [number, setNumber] = useState<number>(0);
	const deleteCommunity = async (communityId: number) => {
		try {
			const response = await fetch(`${baseUrl}/community/${communityId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				navigate('/community');
			} else {
				throw new Error('Failed to delete community');
			}
		} catch (error) {
		}
	};

	const detail = myGroup.communityDetail;

	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter') {
			setNumber((prev) => prev - 1);
		}
	};

	const handlenotice = () => {
		if (noticebody.length > 0) {
			handlenoticePost();
		}
	}

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const inputText = e.target.value;
			if (inputText.length <=49) {
				setnoticebody(inputText);
			} else {
				// maxLength에 도달했을 때 알림
				setModalOpen(true);
			}
		};

	return (
		<>
			<Modal show={modalOpen} size='md' onClose={() => setModalOpen(false)}>
				<Modal.Header />
				<Modal.Body>
					<div className='text-center'>
						<HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
						<h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
							최대 50자까지 작성할 수 있습니다.
						</h3>
						<div className='flex justify-center gap-4'>
							<Button color='failure' onClick={() => setModalOpen(false)}>
								확인
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
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
							<Link to='/group'>모임</Link>
						</BreadcrumbItem>
					</Breadcrumb>
					<div className='flex flex-row justify-between items-center w-full'>
						<div className='flex flex-row items-center gap-x-5'>
							<div className='text-xl font-semibold leading-tight text-gray-700'>{myGroup.communityDetail.title}</div>
							<div className='px-3 border border-tag-100 bg-tag-50 rounded-lg text-tag-100 text-sm flex flex-row items-center justify-center'>
								#{detail.categoryName}
							</div>
							<div>주 {detail.articleCount} 개의 글을 읽습니다. </div>

							<div className='flex gap-2 '>
								<span className='text-2xl text-yellow-400'>
									<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
										<path
											fill='currentColor'
											d='M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14z'
										/>
									</svg>
								</span>
								<span className='font-semibold'>{detail.writerName}</span>
								<div className='flex gap-2'>
									<span className='material-symbols-outlined hover:cursor-pointer'>person</span>
									<span>
										{detail.currentParticipants} / {detail.maxParticipants}
									</span>
								</div>
							</div>
						</div>
						<div className='flex flex-row gap-3'>
							<Button
								className='border bg-red-700 text-white border-red-300 hover:bg-red-800 '
								onClick={() => deleteCommunity(detail.communityId)}
							>
								<div className='flex items-center gap-2'>
									<span>모임 탈퇴</span>
								</div>
							</Button>
							<Button
								className='border bg-blue-700 text-white border-blue-300 hover:bg-blue-800 '
								onClick={() => handleRead4Commu(detail.categoryName, detail.communityId)}
							>
								<div className='flex items-center gap-2'>
									<span>글 읽으러 가기</span>
								</div>
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full px-5 flex flex-row justify-between'>
				<div className='flex flex-row w-full p-3 text bg-[#E1EDFF] rounded-xl items-center gap-3 text-start'>
					<div className='font-bold'>📢 공지</div>:
					{number === 0 ? (
						<>
							<div className='bg-[#E1EDFF] border-none w-5/6 p-2'>{myGroup.notice}</div>
							<span
								className='material-symbols-outlined hover:cursor-pointer text-3xl pl-10 '
								onClick={() => {
									setNumber((prev) => prev + 1);
								}}
							>
								edit_square{' '}
							</span>
						</>
					) : (
						<>
							<input
								type='text'
								name='keyword'
								placeholder='공지 등록하기'
								className=' bg-[#E1EDFF] border-none w-5/6 font-normal'
								onKeyDown={handleKeyPress}
								maxLength={50}
								onChange={handleChange}
							/>
							<span
								className='material-symbols-outlined hover:cursor-pointer text-3xl  pl-10'
								onClick={() => {
									setNumber((prev) => prev - 1);
									handlenotice();
								}}
							>
								check
							</span>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default GroupHeader;
