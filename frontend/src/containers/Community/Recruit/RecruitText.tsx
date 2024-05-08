import { Button, Datepicker } from 'flowbite-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecruitText = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [category, setCategory] = useState('');
	const [participant, setParticipant] = useState('');
	const [articleCount, setArticleCount] = useState('');
	const [startAt, setStartAt] = useState(new Date());
	const [endAt, setEndAt] = useState<Date | null>(null);
	const navigate = useNavigate();

	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;

	const handleDateChange = (date: Date) => {
		setEndAt(date);
	};

	const formattedStartAt = startAt.toISOString().slice(0, 10);
	const formattedEndAt = endAt ? endAt.toISOString().slice(0, 10) : null;

	const handleSubmit = async () => {
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
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(postData),
			});

			alert('등록 성공');
			navigate('/community');
		} catch (error) {
			console.error('등록 실패:', error);
			alert('등록에 실패했습니다.');
		}
	};

	return (
		<>
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
					<div className='flex justify-start'>목표</div>
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
					<Datepicker onSelectedDateChanged={handleDateChange} />
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
				<div className='flex flex-col w-full h-full  items-start  gap-y-2'>
					<span className='font-bold'>내용</span>
					<textarea
						id='textarea'
						className='w-full h-full resize-none'
						placeholder='내용을 입력하세요!'
						onChange={(e) => setContent(e.target.value)}
					></textarea>

					<div className='flex flex-row w-full justify-end'>
						<Button className='border bg-blue-700 text-white border-blue-300 hover:bg-blue-800' onClick={handleSubmit}>
							등록하기
						</Button>{' '}
					</div>
				</div>
			</div>
		</>
	);
};

export default RecruitText;
