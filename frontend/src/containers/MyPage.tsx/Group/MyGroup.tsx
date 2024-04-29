import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import communityList from '../../../types/communityProps';

const MyGroup = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const navigate = useNavigate();
	const handleCommunity = (communityList: communityList[]) => {
		navigate('/mypage/group', { state: { communityList } });
	};
	const handleMyCommunity = (communityId: number) => {
		navigate('/group', { state: { communityId } });
	};

	// const [communityList, setCommunityList] = useState<communityList[]>();
	// // 내가 속한 모임 받아오기
	// const myCommunityData = async () => {
	// 	const data = await fetch(`${baseUrl}/community/myCommunity`).then((response) => response.json());
	// 	return data;
	// };

	// useEffect(() => {
	// 	myCommunityData()
	// 		.then((res) => setCommunityList(res))
	// 		.catch((err) => {
	// 			console.log('내가 읽은 글 받아오는거 에러');
	// 		});
	// }, []);

	const communityList: communityList[] = [
		{
			communityId: 1,
			categoryName: '시사',
			title: 'Seeking Partners',
			startAt: new Date(),
			hit: 523,
			content:
				'To join, Please share a shor introduction about yourself and the topics you are passionate about presenting. Our goal is to create whatever i dont get what theyre talking bout',
		},

		{
			communityId: 2,
			categoryName: '취업',
			title: '함께 취업 발표 준비합시다',
			content: '취업 발표 연습을 위해 함께 연습할 동료를 찾고 있습니다.',

			startAt: new Date(),
			hit: 523,
		},
		{
			communityId: 3,
			title: '저와 같이 심도 있는 토론 하실분 ',
			content: '집에서 집에 가고 싶다고 말하는 것은 무슨 의미인지 의문이 생겼습니다.',

			categoryName: '경제',
			startAt: new Date(),
			hit: 523,
		},
		{
			communityId: 4,
			title: '제 37회 정기 독서토론',
			content: '회원님들 들어와주세요',

			categoryName: '연애',
			startAt: new Date(),
			hit: 523,
		},
	];
	// 날짜순으로 정렬
	const sortedCommunityList = communityList.sort((a, b) => b.startAt.getTime() - a.startAt.getTime());

	// 상위 3개만 추출
	const top3Communities = sortedCommunityList.slice(0, 3);

	return (
		<>
			<div className='flex flex-col w-full'>
				<div className='flex flex-row justify-between items-center pr-10'>
					<div className='p-10 text-2xl font-bold flex'>참여 중인 모임</div>
					<Button
						className='border bg-blue-700 text-white border-blue-300 hover:bg-blue-800'
						onClick={() => handleCommunity(communityList)}
					>
						<span className='material-symbols-outlined text-[1.2rem]'>add</span>
						<span>더보기</span>
					</Button>
				</div>
				<div className='px-10 h-full flex flex-col justify-between gap-y-5'>
					{top3Communities.map((community, index) => (
						<div
							key={index}
							className='border border-gray-300 w-full flex flex-row items-center justify-between p-5 rounded-xl'
						>
							<div className='flex flex-col gap-5'>
								<div className='font-bold text-xl text-start'>{community.title}</div>
								<div className='flex flex-row justify-start gap-5'>
									<div className='text-gray-500'>{community.startAt.toLocaleString()}</div>
									<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
										#{community.categoryName}
									</div>
								</div>
							</div>
							<Button
								className='bg-primary-500 border border-black'
								onClick={() => handleMyCommunity(community.communityId)}
							>
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
