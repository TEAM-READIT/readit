import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth';
import userStore from '../../../store/user';

export const KakaoCallback = () => {
	const navigate = useNavigate();
	const { login} = useAuthStore();
  const { setEmail, setId, setName, setProfileImageUrl } = userStore();
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const code = new URL(document.location.toString()).searchParams.get('code');
	
	
	
	
	const kakaoLogin = useMutation(async () => {
		const response = await fetch(`${baseUrl}/auth/login/kakao?code=${code}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response.json();
	});

	const kakaoLoginAction = async () => {
		try {
			const data = await kakaoLogin.mutateAsync();
			login(data.accessToken);
      const userdata = data.authResponse
			setEmail(userdata.email);
			setId(userdata.id)
      setName(userdata.name);
      setProfileImageUrl(userdata.profileImageUrl);
			navigate('/')
		} catch (error) {
		}
	};

useEffect(() => {
	if (code) {
		kakaoLoginAction();
	}
}, [code]);

	return <></>;
};
