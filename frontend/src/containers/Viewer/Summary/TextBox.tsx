import { useEffect, useState } from 'react';
import { articleList } from '../../../types/articleProps';

interface TextBoxProps {
	setSummary: React.Dispatch<React.SetStateAction<string>>;
	article: articleList;
}

export const TextBox = ({ setSummary, article }: TextBoxProps) => {
	const [value, setValue] = useState<string>('');
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const inputText = e.target.value;
		if (inputText.length <= 750) {
			setSummary(inputText);
		} else {
			// maxLength에 도달했을 때 알림
			alert(`최대 800자까지 입력할 수 있습니다.`);
		}
	};

	useEffect(() => {
		if (article.summary) {
			setValue(article.summary);
		}
	});

	useEffect(()=>{},[value])
	return (
		<>
			<form className='relative h-full' action=''>
				<div className='flex flex-col w-full h-full mb-4 border-2 border-solid rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600'>
					<div className='h-full flex flex-col items-center justify-between px-3 py-2 border-b dark:border-gray-600'>
						<div className='flex-grow w-full px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800'>
							<textarea
								id='editor'
								className='w-full h-full px-0 text-sm border-none text-gray-800 bg-white dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none'
								required
								placeholder='요약문을 작성해주세요!'
								defaultValue={value}
								onChange={handleChange}
								maxLength={800}
							></textarea>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};
