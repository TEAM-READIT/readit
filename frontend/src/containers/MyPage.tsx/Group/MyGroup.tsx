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
				console.log('내가 읽은 글 받아오는거 에러');
			});
	}, []);

	// 상위 3개만 추출
	const top3Communities = communityList?.communityList.reverse().slice(0, 3);

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
					{top3Communities?.map((community, index) => (
						<div
							key={index}
							className='border border-gray-200 w-full flex flex-row items-center justify-between p-5 rounded-xl'
						>
							<div className='flex flex-col gap-2'>
								<div className='font-bold text-start'>{community.title}</div>
								<div className='flex flex-row justify-start gap-5'>
									<div className='text-gray-500'>{community.startAt!.toLocaleString()}</div>
									<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm flex flex-row justify-center items-center'>
										#{community.categoryName}
									</div>
								</div>
							</div>
							<Button className='bg-primary-500 border border-black' onClick={() => handleMyCommunity(community)}>
								모임 페이지 이동하기
							</Button>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default MyGroup;
