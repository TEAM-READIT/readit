import { useState } from "react";

interface TextBoxProps {
	setSummary: React.Dispatch<React.SetStateAction<string>>;
}

export const TextBox = ({ setSummary }: TextBoxProps) => {
	return (
		<>
			<form className='relative h-full' action=''>
				<div className='flex flex-col w-full h-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600'>
					<div className='h-full flex flex-col items-center justify-between px-3 py-2 border-b dark:border-gray-600'>
						<div className='flex w-full items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600'>
							<div className='flex items-center space-x-1 rtl:space-x-reverse sm:pe-4'>
								<button
									type='button'
									className='p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
								>
									1
								</button>
								<button
									type='button'
									className='p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
								>
									1
								</button>
								<button
									type='button'
									className='p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
								>
									1
								</button>
								<button
									type='button'
									className='p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
								>
									1
								</button>
							</div>
							<div className='flex items-center space-x-1 rtl:space-x-reverse sm:ps-4'>
								<button
									type='button'
									className='p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
								>
									2
								</button>
								<button
									type='button'
									className='p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
								>
									2
								</button>
								<button
									type='button'
									className='p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
								>
									2
								</button>
								<button
									type='button'
									className='p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
								>
									2
								</button>
							</div>
						</div>
						<div className='flex-grow w-full px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800'>
							<textarea
								id='editor'
								className='block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none'
								placeholder='요약문을 작성해주세요!'
								required
								onChange={(e) => setSummary(e.target.value)}
							></textarea>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};
