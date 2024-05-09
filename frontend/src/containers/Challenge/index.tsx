import Headers from '../../components/Headers';
import { useEffect, useState } from 'react';
import Rank from './Rank';
import Content from './Content';
import Problems from './Problems';
import { ChallengeProps } from '../../types/challengeProps';
import { useAuthStore } from '../../store/auth';

const Challenge = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const [problems, setProblems] = useState<ChallengeProps>();
	const { accessToken } = useAuthStore();

	// 챌린지 문제 받아오기
	const RankData = async () => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};
		const data = await fetch(`${baseUrl}/challenge/rank`, {
			headers: headers,
		}).then((response) => response.json());
		return data;
	};

	useEffect(() => {
		RankData();
	}, []);
	// 챌린지 문제 받아오기
	const challengeData = async () => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};
		const data = await fetch(`${baseUrl}/challenge`, {
			headers: headers,
		}).then((response) => response.json());
		return data;
	};

	useEffect(() => {
		challengeData()
			.then((res) => {
				if (res) {
					setProblems(res);
				}
			})
			.catch((_err) => {
				console.log('챌린지 받아오는거 에러');
			});
	}, []);
	return (
		<>
			<div className='w-full h-screen flex flex-col items-center  overflow-hidden'>
				<Headers />
				<Rank />
				{problems?.content ? (
					<div className='flex flex-row w-full h-full items-start justify-center gap-10 '>
						<Content problems={problems} />
						<Problems articleId={problems.articleId} problemList={problems.problemList} />
					</div>
				) : null}
				{problems && problems.status === 400 && (
					<div className='text-red-500 text-2xl pt-20'>오늘의 챌린지에 이미 참여하였습니다.</div>
				)}
			</div>
		</>
	);
};

export default Challenge;
