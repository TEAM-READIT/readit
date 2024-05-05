export const Memos = ({ memos }: { memos: string[] }) => {
	return (
		<>

				<div className='text-start flex flex-col gap-10'>
					{memos.map((memo, index) => (
						<div key={index}  className='bg-yellow-200 shadow-md max-w-[300px] h-[300px] '>
							{memo}
						</div>
					))}
				</div>
		</>
	);
};
