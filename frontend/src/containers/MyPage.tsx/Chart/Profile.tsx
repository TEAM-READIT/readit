import ProfileImg from '../../../assets/images/skawkaks.png';
import useStore from '../../../store/user';
const Profile = () => {
	const { name, email, profileImageUrl } = useStore();
	return (
		<>
			<div className='w-1/2 flex flex-col justify-center items-center gap-5 h-1/3'>
				<img src={profileImageUrl} alt='K' className='h-48 round aspect-square rounded-full' />
				<div className='text-2xl font-bold'>{name}</div>
				<div className='text-xl'>{email}</div>
			</div>
		</>
	);
};
export default Profile;
