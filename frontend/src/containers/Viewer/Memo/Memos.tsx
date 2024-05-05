export const Memos = ({ memos }: { memos: string[] }) => {
	return (
		<>
			<div className='text-start flex flex-col gap-10'>
				내가 작성한 메모
				{memos.length>0 ? (
					<>
						{memos.map((memo, index) => (
							<div key={index} className='bg-yellow-200 shadow-md max-w-[300px] h-[300px] '>
								{memo}
							</div>
						))}
					</>
				) : (
					<>작성한 메모가 없습니다</>
				)}
			</div>
		</>
	);
};
