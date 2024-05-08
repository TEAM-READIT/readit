import { communityProps } from '../../types/gropProps';
const Member = ({ myGroup }: { myGroup: communityProps }) => {
	console.log(myGroup.memberList[0].memberProfile)
	return (
		<>
			<div className=' w-full px-5 flex flex-row justify-start gap-20 items-center'>
				<div className='flex flex-row gap-x-2'>
					{myGroup.memberList.map((member, index) => (
						<div key={index}>
							{member.readCount === myGroup.communityDetail.articleCount ? (
								<>
									<div className='bg-positive-500 rounded-full'>
										<img
											src={member.memberProfile}
											alt='사용자프로필'
											className='w-16 h-16 aspect-square rounded-full'
										/>
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
