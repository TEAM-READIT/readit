import ProfileImg from '../../../assets/images/skawkaks.png';
const Profile = () => {
	return (
		<>
			<div className='w-1/2 flex flex-col justify-center items-center gap-5 h-1/3'>
				<img src={ProfileImg} alt='K' className='h-48 round aspect-square rounded-full' />
				<div className='text-2xl font-bold'>여기에 이름</div>
				<div className='text-xl'>여기에 이메일</div>
			</div>
		</>
	);
};
export default Profile;
