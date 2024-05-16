import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import CommunityList from '../../../types/communityProps';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../../store/auth';

const MyGroup = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const { accessToken } = useAuthStore();
	const navigate = useNavigate();

	const handleCommunity = (communityList: CommunityList[]) => {
		navigate('/mypage/group', { state: { communityList } });
	};

	const handleMyCommunity = (community: CommunityList) => {
		navigate('/group', { state: { community } });
	};

	const [communityList, setCommunityList] = useState<{ communityList: CommunityList[] }>();

	// 내가 속한 모임 받아오기
	const myCommunityData = async () => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};
		const data = await fetch(`${baseUrl}/community/myCommunity`, {
			headers: headers,
		}).then((response) => response.json());
		return data;
	};

	useEffect(() => {
		myCommunityData()
			.then((res) => setCommunityList(res))
			.catch((_err) => {
			});
	}, []);

	// 상위 3개만 추출
	const top3Communities = communityList?.communityList.reverse().slice(0, 3);

	const categoryStyles: { [key: string]: string } = {
		비문학: 'bg-blue-200 border border-blue-500',
		정치: 'bg-gray-200 border border-gray-400 text-black',
		경제: 'bg-green-200 border border-green-400 text-black',
		사회: 'bg-yellow-100 border-yellow-400 text-black',
		'생활/문화': 'bg-purple-200 border-purple-400 text-black',
		'IT/과학': 'bg-indigo-200 border-indigo-400 text-black',
		세계: 'bg-pink-200 border-pink-400 text-black',
		오피니언: 'bg-red-200 border-red-400 text-black',
	};

	function getCategoryStyle(categoryName: string) {
		return categoryStyles[categoryName] || 'bg-gray-200 text-gray-800';
	}

	return (
		<>
			<div className='flex flex-col w-full border border-gray-200 pb-10 rounded-xl shadow-md'>
				<div className='flex flex-row justify-between items-center pr-10'>
					<div className='p-10 text-lg font-bold flex'>참여 중인 모임</div>
					<Button
						className='border bg-blue-700 text-white border-blue-300 hover:bg-blue-800'
						onClick={() => handleCommunity(communityList?.communityList!)}
					>
						<span className='material-symbols-outlined text-[1.2rem]'>add</span>
						<span>더보기</span>
					</Button>
				</div>
				<div className='px-10 h-full flex flex-col justify-between gap-y-2'>
					{top3Communities?.length! > 0 ? (
						<>
							{top3Communities?.map((community, index) => (
								<div
									key={index}
									className='border border-gray-200 w-full flex flex-row items-center justify-between p-5 rounded-xl'
								>
									<div className='flex flex-col gap-2'>
										<div className='font-bold text-start'>{community.title}</div>
										<div className='flex flex-row justify-start gap-5'>
											<div className='text-gray-500'>{community.startAt!.toLocaleString()}</div>
											<div
												className={`px-3 border rounded-lg text-sm flex flex-row items-center justify-center ${getCategoryStyle(community.categoryName!)}`}
											>
												#{community.categoryName}
											</div>
										</div>
									</div>
									<Button className='border border-blue-800 text-blue-800 bg-transparent hover:bg-blue-900 hover:text-white' onClick={() => handleMyCommunity(community)}>
										모임 페이지 이동하기
									</Button>
								</div>
							))}
						</>
					) : (
						<>참여 중인 모임이 없습니다</>
					)}
				</div>
			</div>
		</>
	);
};

export default MyGroup;
