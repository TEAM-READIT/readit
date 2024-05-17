import { communityProps } from '../../types/gropProps';
const Member = ({ myGroup }: { myGroup: communityProps }) => {
	return (
		<>
			<div className=' w-full px-5 flex flex-row justify-start gap-20 items-center'>
				<div className='flex flex-row gap-x-2'>
					{myGroup.memberList.map((member, index) => (
						<div key={index}>
							{member.readCount >= myGroup.communityDetail.articleCount ? (
								<>
									<div className='bg-[#33FF33] rounded-full flex flex-row items-center relative justify-center'>
										<img
											src={member.memberProfile}
											alt='사용자프로필'
											className='w-16 h-16 aspect-square rounded-full p-1 '
										/>
										{/* <span className='absolute bottom-0 right-0 material-symbols-outlined text-2xl font-bold  text-green-500 bg-white rounded-full aspect-auto h-9 w-9  border border-black items-center'>check</span> */}
									</div>
								</>
							) : (
								<>
									<div className='bg-white rounded-full'>
										<img
											src={member.memberProfile}
											alt='사용자프로필'
											className='w-16 h-16 aspect-square rounded-full'
										/>
									</div>
								</>
							)}

							<div className='text-sm'>{member.memberName}</div>
							<div className='text-sm'>
								{member.readCount} / {myGroup.communityDetail.articleCount}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Member;
