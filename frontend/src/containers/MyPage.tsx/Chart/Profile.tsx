import userStore from '../../../store/user';
const Profile = () => {
	const { name, email, profileImageUrl } = userStore();
	return (
		<>
			<div className='w-1/2 flex flex-col justify-center items-center gap-5 h-1/3'>
				<img src={profileImageUrl} alt='프로필' className='h-32 round aspect-square rounded-full' />
				<div className='text-xl font-bold'>{name}</div>
				<div className='text-lg'>{email}</div>
			</div>
		</>
	);
};
export default Profile;
