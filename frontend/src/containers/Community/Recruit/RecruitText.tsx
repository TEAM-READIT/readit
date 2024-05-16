import { Button, Modal } from 'flowbite-react';
import Datepicker from 'react-datepicker';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const RecruitText = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [category, setCategory] = useState('');
	const [participant, setParticipant] = useState('');
	const [articleCount, setArticleCount] = useState('');
	const [startAt] = useState(new Date());
	const [endAt, setEndAt] = useState<Date | null>(null);
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const { accessToken } = useAuthStore();

	const handleDateChange = (date: Date) => {
		setEndAt(date);
	};

	const formattedStartAt = startAt.toISOString().slice(0, 10);
	const formattedEndAt = endAt ? endAt.toISOString().slice(0, 10) : null;

	const handleSubmit = async () => {
		if (!isFormValid()) {
			alert('모든 필드를 채워주세요.');
			return;
		}

		const postData = {
			title,
			content,
			categoryName: category,
			maxParticipants: parseInt(participant, 10),
			articleCount: parseInt(articleCount, 10),
			startAt: formattedStartAt,
			endAt: formattedEndAt,
		};

		try {
			await fetch(`${baseUrl}/community/create`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(postData),
			});

			openModal();
		} catch (error) {
			alert('등록에 실패했습니다.');
		}
	};

	// 필드 값이 전부 입력 됐는 지
	const isFormValid = () => {
		return title && content && category && participant && articleCount && endAt;
	};

	const openModal = () => setShowModal(true);
	const closeModal = () => {
		setShowModal(false);
		navigate('/community');
	};


		const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			const inputText = e.target.value;
			if (inputText.length <= 99) {
				setContent(inputText);
			} else {
				// maxLength에 도달했을 때 알림
				setModalOpen(true);
			}
		};


	const Modals = () => {
		if (!showModal) return null;

		return (
			<div className='fixed inset-0 z-50 overflow-y-auto'>
				<div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
					<div className='fixed inset-0 transition-opacity' aria-hidden='true'>
						<div className='absolute inset-0 bg-gray-500 opacity-75'></div>
					</div>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
						&#8203;
					</span>

					<div className='inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
						<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
							<div className='sm:flex sm:items-start'>
								<div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
									<h3 className='text-lg font-medium leading-6 text-gray-900' id='modal-headline'>
										모집 글 작성 성공!
									</h3>
									<div className='mt-2'>
										<p className='text-sm text-gray-500'>모집 글이 생성되었습니다.</p>
									</div>
								</div>
							</div>
						</div>
						<div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse'>
							<button
								type='button'
								className='w-full px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-md border border-transparent shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
								onClick={closeModal}
							>
								닫기
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			<Modal show={modalOpen} size='md' onClose={() => setModalOpen(false)}>
				<Modal.Header />
				<Modal.Body>
					<div className='text-center'>
						<HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
						<h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
							최대 100자까지 작성할 수 있습니다.
						</h3>
						<div className='flex justify-center gap-4'>
							<Button color='failure' onClick={() => setModalOpen(false)}>
								확인
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
			<div className='flex flex-row w-full'>
				<div className='flex flex-col w-1/2 justify-center gap-3 p-3'>
					<div className='flex justify-start'>모집 구분</div>
					<select name='category' className='select' onChange={(e) => setCategory(e.target.value)}>
						<option value=''>카테고리 선택</option>
						<option value='비문학'>비문학</option>
						<option value='정치'>정치</option>
						<option value='경제'>경제</option>
						<option value='사회'>사회</option>
						<option value='생활/문화'>생활/문화</option>
						<option value='IT/과학'>IT/과학</option>
						<option value='세계'>세계</option>
						<option value='오피니언'>오피니언</option>
					</select>
				</div>
				<div className='flex flex-col w-1/2 justify-center gap-3 p-3'>
					<div className='flex justify-start'>모집 인원</div>
					<select name='category' className='select' onChange={(e) => setParticipant(e.target.value)}>
						<option value=''>인원 미정</option>
						<option value='1'>1명</option>
						<option value='2'>2명</option>
						<option value='3'>3명</option>
						<option value='4'>4명</option>
						<option value='5'>5명</option>
						<option value='6'>6명</option>
						<option value='7'>7명</option>
						<option value='8'>8명</option>
					</select>
				</div>
				<div className='flex flex-col w-1/2 justify-center gap-3 p-3'>
					<div className='flex justify-start'>목표 글 개수</div>
					<input
						type='number'
						name='target'
						className='w-full border-gray-500'
						placeholder='주간 목표치'
						min={0}
						max={30}
						onChange={(e) => setArticleCount(e.target.value)}
					/>
				</div>
				<div className='flex flex-col w-1/2 justify-center gap-3 p-3'>
					<div className='flex justify-start'>마감일</div>
					<div className='flex flex-row'>
						<Datepicker
							// showIcon
							locale={ko}
							dateFormat='yyyy년 MM월 dd일'
							shouldCloseOnSelect
							selected={endAt}
							minDate={startAt}
							onChange={handleDateChange}
						/>
					</div>
				</div>
			</div>
			<div className='flex flex-col items-start h-full  w-full gap-y-5 px-5'>
				<div className='flex flex-col w-full items-start  gap-y-2'>
					<span className='font-bold'>제목</span>
					<input
						type='text'
						placeholder='글 제목을 입력해주세요!'
						className='w-full border-gray-500 rounded-lg'
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className='flex flex-col w-full h-full  items-start  gap-y-3'>
					<span className='font-bold'>내용</span>
					<textarea
						id='textarea'
						className='w-full h-4/6 resize-none rounded-lg'
						placeholder='내용을 입력하세요!'
						onChange={handleChange}
						maxLength={100}
					></textarea>

					<div className='flex flex-row w-full justify-end pt-10'>
						<Button
							className='border bg-blue-700 text-white border-blue-300 hover:bg-blue-800'
							onClick={handleSubmit}
							disabled={!isFormValid()}
						>
							등록하기
						</Button>{' '}
					</div>
				</div>
			</div>
			<Modals />
		</>
	);
};

export default RecruitText;
