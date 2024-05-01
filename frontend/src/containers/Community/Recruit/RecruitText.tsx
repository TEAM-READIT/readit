import { Button, Datepicker } from 'flowbite-react';
import { useState } from 'react';

const RecruitText = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [category, setCategory] = useState('')
	const [participant, setParticipant] = useState('')
	const [startDate, setStartDate] = useState<Date|null>(null)

	console.log(participant)
	console.log(title)
	console.log(content)
	console.log(category);
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
						<option value='9'>9명</option>
						<option value='10'>10명 이상</option>
					</select>
				</div>
				<div className='flex flex-col w-1/2 justify-center gap-3 p-3'>
					<div className='flex justify-start'>진행 기간</div>
					<select name='category' className='select'>
						<option value=''>기간 미정 ~ 6개월 이상</option>
						<option value='1'>1개월</option>
						<option value='2'>2개월</option>
						<option value='3'>3개월</option>
						<option value='4'>4개월</option>
						<option value='5'>5개월</option>
						<option value='6'>6개월</option>
						<option value='7'>장기</option>
					</select>
				</div>
				<div className='flex flex-col w-1/2 justify-center gap-3 p-3'>
					<div className='flex justify-start'>마감일</div>
					<Datepicker/>
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
						className='w-full h-full'
						placeholder='내용을 입력하세요!'
						onChange={(e) => setContent(e.target.value)}
					></textarea>

					<div className='flex flex-row w-full justify-end'>
						<Button className='border bg-blue-700 text-white border-blue-300 hover:bg-blue-800'>등록하기</Button>{' '}
					</div>
				</div>
			</div>
		</>
	);
};

export default RecruitText;
