import { Card } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import communityList from '../../types/communityProps';
import { useMutation } from 'react-query';
import { useAuthStore } from '../../store/auth';

const PopCommu = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const [page, setPage] = useState<number>(1);
	const navigate = useNavigate();
	const {accessToken} = useAuthStore();
	
	// 조회수 ++
	const hits = useMutation(async (id: number) => {
		const response = await fetch(`${baseUrl}/community/hit/${id}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		});
		console.log(response);
	});
	const handlehits = async (id: number) => {
		try {
			await hits.mutateAsync(id);
		} catch (error) {
			console.error('', error);
		}
	};

	const handleCardClick = (community: communityList) => {
	navigate('/detail', { state: { community } });
		handlehits(community?.communityId);
	};


	const [popCommunity, setPopCommunity] = useState<{ communityList: communityList[] }>();
	//인기 있는 모임 받아오기
	const popCommunityData = async () => {
		const data = await fetch(`${baseUrl}/community/hot`).then((response) => response.json());
		return data;
	};

	useEffect(() => {
		popCommunityData()
			.then((res) => setPopCommunity(res))
			.catch((_err) => {
				console.log('커뮤니티 받아오기 에러');
			});
	}, []);

	const communitys = popCommunity?.communityList;
	console.log(communitys);
	return (
		<>
			<div className='flex flex-col w-full items-center pb-32'>
				<div className='flex flex-row w-full h-28 items-center text-gray-400 font-bold text-2xl text-end gap-x-16'>
					<div className='text-black hover:cursor-pointer flex flex-row justify-between items-center w-full pr-10'>
						<div>🔥 이번 주 리딧 인기 모임</div>
						<div className='flex'>
							<span className='material-symbols-outlined' onClick={() => setPage(1)}>
								arrow_circle_left
							</span>
							<span className='material-symbols-outlined' onClick={() => setPage(2)}>
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
										className='flex flex-col w-64 h-44  justify-between rounded-3xl border-gray-400 border hover:cursor-pointer'
										onClick={() => handleCardClick(community)}
									>
										<div className='flex justify-end gap-2 h-1/5'>
											<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
												#{community.categoryName}
											</div>
										</div>
										<div className='h-3/5 text-start font-bold'>
											{community.title.length <= 35 ? (
												<div>{community.title} </div>
											) : (
												<div>{community.title.slice(0, 35)}...</div>
											)}
										</div>
										<div className='text-end text-sm'>👀 조회수 {community.hit}</div>
									</Card>
								))}
							</>
						) : (
							<>
								{' '}
								{communitys?.slice(4, 8).map((community, index) => (
									<Card
										key={index}
										className='flex flex-col w-64 h-44  justify-between rounded-3xl border-gray-400 border hover:cursor-pointer'
										onClick={() => handleCardClick(community)}
									>
										<div className='flex justify-end gap-2 h-1/5'>
											<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
												#{community.categoryName}
											</div>
										</div>
										<div className='h-3/5 text-start font-bold'>
											{community.title.length <= 35 ? (
												<div>{community.title} </div>
											) : (
												<div>{community.title.slice(0, 35)}...</div>
											)}
										</div>
										<div className='text-end text-sm'>👀 조회수 {community.hit}</div>
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
