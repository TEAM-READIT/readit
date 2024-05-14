interface TextBoxProps {
	setSummary: React.Dispatch<React.SetStateAction<string>>;
	defaultSummaryValue: string
}

export const TextBox = ({ setSummary, defaultSummaryValue }: TextBoxProps) => {
	return (
		<>
			<form className='relative h-full' action=''>
				<div className='flex flex-col w-full h-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600'>
					<div className='h-full flex flex-col items-center justify-between px-3 py-2 border-b dark:border-gray-600'>
						<div className='flex-grow w-full px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800'>
							<textarea
								id='editor'
								className='block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none'
								placeholder={defaultSummaryValue}
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
