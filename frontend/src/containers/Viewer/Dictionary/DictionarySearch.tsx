export const DictionarySearch = () => {
	return (
		<>
			<div className='relative flex w-full'>
				<input
					type='search'
					className='w-[90%] m-[0.5vw] block rounded border border-solid border-neutral-200 bg-transparent bg-clip-padding py-[0.2rem] text-sm font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-white dark:placeholder:text-neutral-200 dark:autofill:shadow-autofill dark:focus:border-primary'
					placeholder='검색할 단어 입력'
				/>
				<span className='w-[10%] flex items-center whitespace-nowrap px-auto py-[0.25rem] text-surface dark:border-neutral-400 dark:text-white [&>svg]:h-4 [&>svg]:w-4'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke-width='2'
						stroke='currentColor'
					>
						<path
							stroke-linecap='round'
							stroke-linejoin='round'
							d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
						/>
					</svg>
				</span>
			</div>
		</>
	);
};