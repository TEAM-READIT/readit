import { Button } from 'flowbite-react';
import { useState } from 'react';

const RecruitText = () => {
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	console.log(title)
	console.log(content)
	return (
		<>
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
						placeholder='내용을 입력하세요.'
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
