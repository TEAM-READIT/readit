import { useEffect, useState } from 'react';
import { articleList } from '../../../types/articleProps';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

interface TextBoxProps {
	setSummary: React.Dispatch<React.SetStateAction<string>>;
	article: articleList;
}

export const TextBox = ({ setSummary, article }: TextBoxProps) => {
	const [value, setValue] = useState<string>('');
	const [modalOpen, setModalOpen] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const inputText = e.target.value;
		if (inputText.length <= 499) {
			setSummary(inputText);
		} else {
			// maxLength에 도달했을 때 알림
			setModalOpen(true);
		}
	};

	useEffect(() => {
		if (article){
		if (article.summary) {
			setValue(article.summary);
		}}
	});

	useEffect(() => {}, [value]);
	return (
		<>
			<Modal show={modalOpen} size='md' onClose={() => setModalOpen(false)}>
				<Modal.Body>
					<div className='text-center'>
						<HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
						<h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
							최대 500자까지 작성할 수 있습니다.
						</h3>
						<div className='flex justify-center gap-4'>
							<Button color='failure' onClick={() => setModalOpen(false)}>
								확인
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
			<form className='relative h-full' action=''>
				<div className='flex flex-col w-full h-full mb-4 border-2 border-solid rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600'>
					<div className='h-full flex flex-col items-center justify-between px-3 py-2 border-b dark:border-gray-600'>
						<div className='flex-grow w-full px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800'>
							<textarea
								id='editor'
								className='w-full h-full px-0 text-lg border-none text-gray-800 bg-white dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none'
								required
								placeholder='요약문을 작성해주세요!'
								defaultValue={value}
								onChange={handleChange}
								maxLength={500}
							></textarea>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};
