import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth';
import useStore from '../../../store/user';

export const NaverCallback = () => {
	const navigate = useNavigate();
	const { login, accessToken, logout } = useAuthStore();
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const code = new URL(document.location.toString()).searchParams.get('code');
	const { setEmail, setName, setProfileImageUrl } = useStore();

	const naverLogin = useMutation(async () => {
		const response = await fetch(`http://${baseUrl}/auth/login/naver?code=${code}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response.json();
	});

	const naverLoginAction = async () => {
		try {
			const data = await naverLogin.mutateAsync();
			login(data.accessToken);
			const userdata = data.authResponse;
			setEmail(userdata.email);
			setName(userdata.name);
			setProfileImageUrl(userdata.profileImageUrl);
			navigate('/');

			navigate('/');
		} catch (error) {
			console.log('error');
		}
	};

	useEffect(() => {
		naverLoginAction();
	}, []);

	return <></>;
};
