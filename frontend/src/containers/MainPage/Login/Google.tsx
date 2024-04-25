import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth';
import useStore from '../../../store/user';

export const GoogleCallback = () => {
	const navigate = useNavigate();
	const { login, accessToken, logout } = useAuthStore();
	const { setEmail, setId, setName, setProfileImageUrl } = useStore();
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;

	const code = new URL(document.location.toString()).searchParams.get('code');
	const encodedCode = encodeURIComponent(code!);
	console.log(encodedCode);

	const googleLogin = useMutation(async () => {
		const response = await fetch(`http://${baseUrl}/auth/login/google?code=${encodedCode}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response.json();
	});

	const googleLoginAction = async () => {
		try {
			const data = await googleLogin.mutateAsync();
			login(data.accessToken);
			const userdata = data.authResponse;
			setEmail(userdata.email);
			setName(userdata.name);
			setProfileImageUrl(userdata.profileImageUrl);
			navigate('/');
		} catch (error) {
			console.log('error');
		}
	};

	useEffect(() => {
		if (code) {
			googleLoginAction();
		}
	}, [code]);

	return <></>;
};
