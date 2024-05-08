import { communityProps } from '../../types/gropProps';
import ProfileImage from '../../assets/images/profile.png';
const Member = ({ myGroup }: { myGroup: communityProps }) => {
	return (
		<>
			<div className=' w-full px-5 flex flex-row justify-start gap-20 items-center'>
				<div className='flex flex-row gap-x-2'>
					{myGroup.memberList.map((member, index) => (
						<div key={index}>
							{/* <img src='member.profile' alt='사용자프로필' className='w-16 aspect-auto' /> */}
							{member.readCount === myGroup.articleCount ? (
								<>
									<div className='bg-positive-500 rounded-full'>
										<img src={ProfileImage} alt='사용자프로필' className='w-16 aspect-auto' />
									</div>
								</>
							) : (
								<>
									<div className='bg-white rounded-full'>
										<img src={ProfileImage} alt='사용자프로필' className='w-16 aspect-auto' />
									</div>
								</>
							)}

							<div className='text-sm'>{member.memberName}</div>
							<div className='text-sm'>
								{member.readCount} / {myGroup.articleCount}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Member;
