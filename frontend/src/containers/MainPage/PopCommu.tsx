import { Card } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommunityList from '../../types/communityProps';
import { useMutation } from 'react-query';
import { useAuthStore } from '../../store/auth';

const PopCommu = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const [page, setPage] = useState<number>(1);
	const navigate = useNavigate();
	const { accessToken } = useAuthStore();

	// 조회수 ++
	const hits = useMutation(async (id: number) => {
		await fetch(`${baseUrl}/community/hits/${id}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		});
	});
	const handlehits = async (id: number) => {
		try {
			await hits.mutateAsync(id);
		} catch (error) {
		}
	};

	const handleCardClick = (community: CommunityList) => {
		navigate('/detail', { state: { community } });
		handlehits(community?.communityId!);
	};

	const [popCommunity, setPopCommunity] = useState<{ communityList: CommunityList[] }>();
	//인기 있는 모임 받아오기
	const popCommunityData = async () => {
		const data = await fetch(`${baseUrl}/community/hot`).then((response) => response.json());
		return data;
	};

	useEffect(() => {
		popCommunityData()
			.then((res) => setPopCommunity(res))
			.catch((_err) => {
			});
	}, []);

	const communitys = popCommunity?.communityList;
	return (
		<>
			<div className='flex flex-col w-full items-center'>
				<div className='flex flex-row w-full h-24 items-center text-gray-400 font-bold text-2xl text-end gap-x-16'>
					<div className='text-black hover:cursor-pointer flex flex-row justify-between items-center w-full pr-10'>
						<div>🔥 이번 주 리딧 인기 모임</div>
						<div className='flex'>
							<span className='material-symbols-outlined' onClick={() => setPage((prev) => prev * -1)}>
								arrow_circle_left
							</span>
							<span className='material-symbols-outlined' onClick={() => setPage((prev) => prev * -1)}>
								arrow_circle_right
							</span>
						</div>
					</div>
				</div>
				<div className='flex flex-row w-full justify-start px-5 gap-5 flex-wrap'>
					<>
						{page == 1 ? (
							<>
								{communitys?.slice(0, 4).map((community, index) => (
									<Card
										key={index}
										className='flex flex-col w-64 h-48  justify-between rounded-3xl border-gray-400 border hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'
										onClick={() => handleCardClick(community)}
									>
										<div className='flex justify-end gap-2 h-1/5'>
											<div className='px-3 border border-tag-100 bg-tag-50 rounded-lg text-tag-100 text-sm flex flex-row items-center justify-center'>
												#{community.categoryName}
											</div>
										</div>
										<div className='h-3/5 text-start font-bold'>
											{community.title.length <= 28 ? (
												<div>{community.title} </div>
											) : (
												<div>{community.title.slice(0, 28)}...</div>
											)}
										</div>
										<div className='text-end text-sm'>👀 조회수 {community.hits}</div>
									</Card>
								))}
							</>
						) : (
							<>
								{' '}
								{communitys?.slice(4, 8).map((community, index) => (
									<Card
										key={index}
										className='flex flex-col w-64 h-48 justify-between rounded-3xl border-gray-400 border hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'
										onClick={() => handleCardClick(community)}
									>
										<div className='flex justify-end gap-2 h-1/5'>
											<div className='px-3 border border-tag-100 bg-tag-50 rounded-lg text-tag-100 text-sm flex flex-row items-center justify-center'>
												#{community.categoryName}
											</div>
										</div>
										<div className='h-3/5 text-start font-bold'>
											{community.title.length <= 28 ? (
												<div>{community.title} </div>
											) : (
												<div>{community.title.slice(0, 28)}...</div>
											)}
										</div>
										<div className='text-end text-sm'>👀 조회수 {community.hits}</div>
									</Card>
								))}
							</>
						)}
					</>
				</div>
			</div>
		</>
	);
};
export default PopCommu;
