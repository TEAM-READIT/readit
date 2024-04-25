import { useEffect } from 'react';
import { useAuthStore } from '../../../store/auth';
import { useNavigate } from 'react-router-dom';
import KakaoIcon from '../../../assets/images/kakao.png';
import GoogleIcon from '../../../assets/images/google.png';
import NaverIcon from '../../../assets/images/naver.png';
import { Card } from 'flowbite-react';

interface LoginProps {
	close: () => void;
}

const Login = ({ close }: LoginProps) => {
	const navigate = useNavigate();
	const { login, accessToken, logout } = useAuthStore();
	const searchParams = new URLSearchParams(window.location.search);
	const code = searchParams.get('code');
	const clientId = import.meta.env.VITE_APP_PUBLIC_GOOGLE_REST_API_KEY;
	useEffect(() => {
		if (code) {
			login(code);
			navigate('/');
		}
	}, [code]);
	const kakaoAuth = () => {
		location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${
			import.meta.env.VITE_APP_PUBLIC_KAKAO_REST_API_KEY
		}&redirect_uri=${import.meta.env.VITE_APP_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
	};

	const naverAuth = () => {
		location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
			import.meta.env.VITE_APP_PUBLIC_NAVER_REST_API_KEY
		}&redirect_uri=${import.meta.env.VITE_APP_PUBLIC_NAVER_REDIRECT_URI}&state=readit123`;
	};
	const googleAuth = () => {
		location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
			import.meta.env.VITE_APP_PUBLIC_GOOGLE_REST_API_KEY
			// TODO: 이거 scope?
		}&redirect_uri=${import.meta.env.VITE_APP_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20profile%20email`;
	};

	return (
		<>
			<div className='bg-black absolute z-50 top-0 w-full h-screen opacity-70 flex flex-col  justify-center items-center'></div>
			<Card className='flex flex-col w-full max-w-[800px] h-[500px] mt-24 absolute z-50  border-2 justify-start left-1/2 top-1/3  transform -translate-x-1/2 -translate-y-1/2'>
				<div className='flex flex-row w-full  justify-between font-nicolast'>
					<div>READIT</div>
					<div onClick={close}>
						<span className='material-symbols-outlined text-[1.2rem] hover:cursor-pointer'>close</span>
					</div>
				</div>
				<div className='w-full h-full py-10'>
					<div className='text-2xl font-bold h-1/3 text-center'>READIT에 오신 것을 환영합니다! </div>
					<div className='flex flex-row justify-center gap-x-10'>
						<div className='flex flex-col'>
							<button
								className='flex items-center justify-center bg-white text-gray-800 border-gray-300 hover:bg-gray-50 w-32 h-32 rounded-xl'
								onClick={googleAuth}
							>
								<img src={GoogleIcon} alt='K' className='w-16 h-16' />
							</button>
							<>Google 로그인</>
						</div>
						<div className='flex flex-col'>
							<button
								className='flex items-center justify-center bg-white text-green-800 border-green-300 hover:bg-opacity-70 w-32 h-32 rounded-xl'
								onClick={naverAuth}
							>
								<img src={NaverIcon} alt='K' className='w-16 h-16' />
							</button>
							<>Naver 로그인</>
						</div>
						<div className='flex flex-col'>
							<button
								className='flex items-center justify-center bg-white text-yellow-800 border-yellow-300 hover:bg-opacity-70 w-32 h-32 rounded-xl'
								onClick={kakaoAuth}
							>
								<img src={KakaoIcon} alt='K' className='w-16 h-16' />
							</button>
							<>Kakao 로그인</>
						</div>
					</div>
				</div>
			</Card>
		</>
	);
};

export default Login;
