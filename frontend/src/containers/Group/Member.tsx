import { useState } from 'react';
import { communityProps } from '../../types/gropProps';

const Member = ({ myGroup }: { myGroup: communityProps }) => {
	const [hoveredMemberIndex, setHoveredMemberIndex] = useState<number | null>(null);

	const handleMouseEnter = (index: number) => {
		setHoveredMemberIndex(index);
	};

	const handleMouseLeave = () => {
		setHoveredMemberIndex(null);
	};

	return (
		<>
			<div className='w-full px-5 flex flex-row justify-start gap-20 items-center'>
				<div className='flex flex-row gap-x-2'>
					{myGroup.memberList.map((member, index) => (
						<div key={index} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
							{member.readCount >= myGroup.communityDetail.articleCount ? (
								<div className='bg-[#33FF33] rounded-full flex flex-row items-center relative justify-center'>
									<img
										src={member.memberProfile}
										alt='사용자프로필'
										className='w-16 h-16 aspect-square rounded-full p-1'
									/>
								</div>
							) : (
								<div className='bg-white rounded-full'>
									<img src={member.memberProfile} alt='사용자프로필' className='w-16 h-16 aspect-square rounded-full' />
								</div>
							)}
							<div className='text-sm'>{member.memberName.slice(0, 10)}</div>
							{hoveredMemberIndex === index && (
								<div className='absolute bg-white border border-black p-2 rounded shadow'>{myGroup.memberList[index].memberName}</div>
							)}
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
