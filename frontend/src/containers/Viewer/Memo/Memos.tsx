export const Memos = ({ memos }: { memos: string[] }) => {
	return (
		<>
			<div className='text-start flex flex-col gap-10'>
				<div className='text-center font-bold text-lg'>내가 작성한 메모</div>
				<div>
					{memos.length > 0 ? (
						<>
							<div className='flex flex-col gap-10'>
								{memos.map((memo, index) => (
									<div key={index} className='bg-yellow-200 shadow-lg max-w-[300px] h-full p-5 '>
										{memo}
									</div>
								))}
							</div>
						</>
					) : (
						<div className='text-center bg-white-200 shadow-lg max-w-[300px] h-[120px] p-5 '>
							작성한 메모가 없습니다 <br />
							<br />
							메모를 작성해보세요!
						</div>
					)}
				</div>
			</div>
		</>
	);
};
