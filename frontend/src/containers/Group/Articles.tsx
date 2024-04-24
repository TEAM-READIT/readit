import { useLocation } from "react-router-dom";
import ProfileImage from '../../assets/images/profile.png';

const Articles = () => {
	const location = useLocation();
	const group = location.state?.group;
  return (
		<>
			<div className='w-full flex flex-row gap-5'>
				<div className='flex flex-col'>
					<img src={ProfileImage} alt='사용자프로필' className='w-16 aspect-auto' />
					<div className='font-bold'>박현춘</div>
				</div>
				<div className='flex flex-col gap-5'>
					<div className='flex flex-row gap-5 '>
						<div>글 읽은 시간 대충 어쩌구 저쩌구</div>
						<div className='flex justify-center items-center w-16 border  border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
							{group.tag}
						</div>
					</div>
					<div className='flex justify-start text-xl font-bold'>{group.title} </div>
					<div>{group.detail} </div>
				</div>
			</div>
		</>
	);
}

export default Articles