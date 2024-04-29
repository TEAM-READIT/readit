import Headers from '../../components/Headers';
import SearchFilter from './SearchFilter';
import SearchList from './SearchList';
import CommunityHeader from './CommunityHeader';
import communityList from '../../types/communityProps';


const Community = () => {
	// const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	// const [totalCommunity, setTotalCommunity] = useState<communityList[]>();
	//전체 커뮤니티 조회
	// const totalCommunityData = async (filter: string) => {
	// 	const data = await fetch(`${baseUrl}/community/list?${filter}`).then((response) => response.json());
	// 	return data;
	// };
	// 검색 필터 변경 시 다시 받아오기
	const handleFilterChange = (filter: string) => {
		console.log(filter);
		totalCommunityData(filter)
			.then((res) => setTotalCommunity(res))
			.catch((err) => {
				console.log('전체 글 목록 조회 or 필터링 된 글 불러오기 실패');
			});
	};

	// useEffect(() => {
	// 	totalArticleData('')
	// 		.then((res) => setTotalArticle(res))
	// 		.catch((err) => {
	// 			console.log('전체 아티클 받아오는거 에러');
	// 		});
	// }, []);
const totalCommunity: communityList[] = [
	{
		communityId: 1,
		hit: 523,
		writerName: '오영주',
		maxParticipants: 4,
		currentParticipants: 2,
		categoryName: '시사',
		title: 'Seeking Partners',
		content:
			'To join, Please share a shor introduction about yourself and the topics you are passionate about presenting. Our goal is to create whatever i dont get what theyre talking bout',

		startAt: new Date(),
		endAt: new Date(),
	},

	{
		communityId: 2,
		hit: 523,
		writerName: '박현춘',
		maxParticipants: 8,
		currentParticipants: 1,
		categoryName: '취업',
		title: '함께 취업 발표 준비합시다',
		content: '취업 발표 연습을 위해 함께 연습할 동료를 찾고 있습니다.',
		startAt: new Date(),
		endAt: new Date(),
	},
	{
		communityId: 3,
		title: '저와 같이 심도 있는 토론 하실분 ',
		hit: 523,
		writerName: '박현춘',
		maxParticipants: 8,
		currentParticipants: 1,
		categoryName: '경제',
		content: '집에서 집에 가고 싶다고 말하는 것은 무슨 의미인지 의문이 생겼습니다.',
		startAt: new Date(),
		endAt: new Date(),
	},
	{
		communityId: 4,
		title: '제 37회 정기 독서토론',
		categoryName: '연애',
		writerName: '박현춘',
		maxParticipants: 8,
		currentParticipants: 1,
		content: '회원님들 들어와주세요',
		hit: 523,
		startAt: new Date(),
		endAt: new Date(),
	},
];
	return (
		<>
			<div className='w-full flex justify-center flex-col items-center h-full'>
				<Headers />
				<div className='flex flex-col w-3/5 h-full justify-start  items-center '>
					<CommunityHeader />
				</div>
				<div className='flex flex-row w-full justify-start gap-20 h-auto'>
					<div className='h-auto w-1/6 px-10'>
						<SearchFilter handleFilterChange={handleFilterChange} />{' '}
					</div>
					<div className='flex w-3/5 h-auto flex-col justify-start gap-5 '>
						<SearchList totalCommunity={totalCommunity}/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Community;
