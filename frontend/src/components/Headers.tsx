import { useEffect } from 'react';
import { useAuthStore } from '../store/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from '../containers/MainPage/Login/Login';
import useModal from '../hooks/useModal';
import useStore from '../store';
import { useMutation } from 'react-query';

const Headers = () => {
	const { accessToken, logout } = useAuthStore();
	const { setModal, setLastfilter } = useStore();
	const navigate = useNavigate();
	const [isOpen, open, close] = useModal();
	const location = useLocation();

	useEffect(() => {
		if (isOpen) {
			setModal(true);
		} else {
			setModal(false);
		}
	}, [isOpen]);

	// 로그아웃
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;

	const logoutPost = useMutation(async () => {
		await fetch(`${baseUrl}/auth/logout`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		});
	});
	const handlelogout = async () => {
		logout();
		try {
			await logoutPost.mutateAsync();
		} catch (error) {}
	};

	const handleEssay = () => {
		setLastfilter('');
		navigate('/essay');
	};
	return (
		<>
			<div className='flex justify-center w-full '>
				<div className='w-3/5 flex flex-row justify-between items-center p-5 '>
					<div className='font-nicolast text-4xl hover:cursor-pointer ' onClick={() => navigate('/')}>
						Readit
					</div>
					<div className='flex flex-row justify-between gap-8 font-bold text-xl hover:cursor-pointer items-center'>
						{accessToken ? (
							<>
								<div
									className={location.pathname === '/challenge' ? 'text-blue-800' : ''}
									onClick={() => navigate('/challenge')}
								>
									챌린지
								</div>
								<div className={location.pathname === '/essay' ? 'text-blue-800' : ''} onClick={handleEssay}>
									글 목록
								</div>
								<div
									className={location.pathname === '/community' ? 'text-blue-800' : ''}
									onClick={() => navigate('/community')}
								>
									커뮤니티
								</div>
								<div
									className={location.pathname === '/mypage' ? 'text-blue-800' : ''}
									onClick={() => navigate('/mypage')}
								>
									마이페이지
								</div>
							</>
						) : (
							<>
								<div onClick={open}>챌린지</div>
								<div className={location.pathname === '/essay' ? 'text-blue-800' : ''} onClick={handleEssay}>
									글 목록
								</div>
								<div
									className={location.pathname === '/community' ? 'text-blue-800' : ''}
									onClick={() => navigate('/community')}
								>
									커뮤니티
								</div>{' '}
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
						)}
					</div>
				</div>
			</div>

			{isOpen ? <Login close={close} /> : null}
		</>
	);
};
export default Headers;
