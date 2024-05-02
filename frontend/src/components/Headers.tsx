import { useEffect } from 'react';
import { useAuthStore } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import Login from '../containers/MainPage/Login/Login';
import useModal from '../hooks/useModal';
import useStore from '../store';
import { useMutation } from 'react-query';
import userStore from '../store/user';

const Headers = () => {
	const { accessToken, logout } = useAuthStore();
	const { id } = userStore();
	const { setModal } = useStore();
	const navigate = useNavigate();

	const [isOpen, open, close] = useModal();
	useEffect(() => {
		if (isOpen) {
			setModal(true);
		} else {
			setModal(false);
		}
	}, [isOpen]);

	// 로그아웃
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const requestBody = {
		id: id,
	};
	const logoutPost = useMutation(async () => {
		const response = await fetch(`${baseUrl}/oauth/logout`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		});
		return response.json();
	});
	const handlelogout = async () => {
		try {
			await logoutPost.mutateAsync();
			logout();
		} catch (error) {
			console.error('로그아웃 실패', error);
		}
	};

	return (
		<>
			<div className='flex justify-center w-full '>
				<div className='w-3/5 flex flex-row justify-between items-center p-5 '>
					<div className='font-nicolast text-4xl hover:cursor-pointer ' onClick={() => navigate('/')}>
						Readit
					</div>
					<div className='flex flex-row justify-between gap-8 font-bold text-xl hover:cursor-pointer items-center'>
						{/* {accessToken ? ( */}
						<>
							<div onClick={() => navigate('/challenge')}>챌린지</div>
							<div onClick={() => navigate('/essay')}>글</div>
							<div onClick={() => navigate('/community')}>커뮤니티</div>
							<div onClick={() => navigate('/mypage')}>마이페이지</div>
						</>
						{/* ) : (
							<>
								<div onClick={open}>챌린지</div>
								<div onClick={open}>글</div>
								<div onClick={open}>커뮤니티</div>
								<div onClick={open}>마이페이지</div>
							</>
						)}
						{accessToken ? (
							<div
								onClick={() => {
									handlelogout();
									navigate('/');
								}}
							>
								로그아웃
							</div>
						) : (
							<div onClick={open}>로그인</div>
						)} */}
					</div>
				</div>
			</div>

			{isOpen ? <Login close={close} /> : null}
		</>
	);
};
export default Headers;
