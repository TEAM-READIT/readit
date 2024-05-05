import { useState } from 'react';
import Headers from '../../components/Headers';
import UpArrow from '../../assets/images/up-arrow.png';
import DownArrow from '../../assets/images/down-arrow.png';
import { DictionarySearch } from './DictionarySearch';
import { TextBox } from './Summary/TextBox';
import { Memos } from './Memo/Memos';
import { Button, Card } from 'flowbite-react';
import { MainText } from './TextArea/MainText';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	useMutation,
	// useQuery
} from 'react-query';
import { useAuthStore } from '../../store/auth';
import useModal from '../../hooks/useModal';
// import { articleList } from '../../types/articleProps';
interface FeedBackProps {
	score: number;
	feedback: string;
}

// interface wordListProps {
// 	word: string;
// 	definition: string;
// }


interface RequestBody {
  content: string;
  summary: string; 
}


export const ViewerPage = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const { accessToken } = useAuthStore();
	const [isBottomOpen, setBottomOpen] = useState(true);
	const location = useLocation();
	const [memos, setMemos] = useState<string[]>([]);
	const article = location.state?.article;
	// const communityId = location.state?.communityId; // 커뮤니티 내에서 읽으려면 커뮤니티 아이디를 추가로 보내야되는데 어디다가?
	const navigate = useNavigate();
	// const [wordList, setWordList] = useState<wordListProps[]>();
	const [isOpen, open, close] = useModal();
	// 요약한 내용
	const [summary, setSummary] = useState<string>('');
	// 피드백
	const [feedback, setFeedback] = useState<FeedBackProps>();

	// 하단 슬라이드 상태 값
	const toggleBottom = () => {
		setBottomOpen(!isBottomOpen);
	};

	// 모르는 단어 불러오기
	// const { data } = useQuery('article', async () => {
	// 	const response = await fetch(`${baseUrl}/viewer/${article.articleId}`);
	// 	const data = await response.json();
	// 	setWordList(data);
	// 	return data;
	// });

	// 제출 POST
	const requestbody: RequestBody = {
		content: '',
		summary: summary,
	};


	const summarySubmit = useMutation(async () => {
		const response = await fetch(`${baseUrl}/viewer/submission/${article.articleId}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestbody),
		});
		return response.json();
	});

	const handleSubmit = async () => {
		open();
		try {
			const data = await summarySubmit.mutateAsync();
			setFeedback(data);
		} catch (error) {
			console.error('제출 실패', error);
		}
	};

	// 임시 제출하기
	const tempSubmit = useMutation(async () => {
		const response = await fetch(`${baseUrl}/viewer/temp/${article.articleId}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestbody),
		});
		return response.json();
	});
	const handleTempSubmit = async () => {
		try {
			await tempSubmit.mutateAsync();
		} catch (error) {
			console.error('임시저장 실패', error);
		}
	};

	//TODO: 점수 보고 어디로 이동해야될가요?
	const handleExit = () => {
		close();
		navigate('/');
	};

	return (
		<>
			<div className=' z-50 w-full h-screen flex flex-col items-center  overflow-hidden'>
				<Headers />
				<div className='relative flex w-full'>
					<div
						className={` relative flex flex-col w-5/6 h-screen transition-all duration-300 ease-in-out`}
					>
						<div
							className={`relative flex w-full ${isBottomOpen ? 'h-3/5' : 'h-[88%]'} transition-all duration-300 ease-in-out`}
						>
							<DictionarySearch/>
								<div className='w-full h-full relative'>
									<MainText
										setMemos={setMemos}
										article={article}
									/>
									
							</div>
						</div>
						<div
							className={`relative flex flex-col transition-all duration-300 ease-in-out ${isBottomOpen ? 'h-1/3' : 'h-1/12'}`}
						>
							<div className='w-full h-1/12 flex justify-center' onClick={toggleBottom}>
								<img src={isBottomOpen ? DownArrow : UpArrow} />
							</div>
							<div
								className={`w-full h-full p-[1vw] transition-all duration-300 ease-in-out border-solid  ${isBottomOpen ? 'block' : 'hidden'}`}
							>
								<TextBox setSummary={setSummary} />
							</div>
						</div>
					</div>
					<div
						className='relative flex h-screen transition-all duration-300 ease-in-out border-solid border-2 w-1/6'
					>

						<div
							className='w-full h-full transition-all duration-300 ease-in-out block '
						>
							<div className='overflow-y-auto overflow-x-hidden h-[85%] p-10'>
								
							<Memos
								memos={memos}
								/>
								</div>
							<div className='flex flex-row items-center w-full justify-center px-10 gap-5  '>
									<Button className='w-full border bg-gray-400 text-white border-gray-300 hover:bg-gray-500'>
										<div className='flex items-center'>
											<span onClick={handleTempSubmit}>임시 저장</span>
										</div>
									</Button>
									<Button className='w-full border bg-blue-700 text-white border-blue-300 hover:bg-blue-800'>
										<div className='flex items-center'>
											<span onClick={handleSubmit}>제출</span>
										</div>
									</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isOpen ? (
				<>
					<div className='bg-black absolute z-50 w-full h-screen opacity-70 flex flex-col  justify-center items-center'></div>
					<Card className='flex flex-col w-full max-w-[800px] h-[500px] mt-24 absolute z-50  border-2 justify-start left-1/2 top-1/3  transform -translate-x-1/2 -translate-y-1/2'>
						<div className='flex flex-row w-full  justify-between font-nicolast'>
							<div>READIT</div>
							<div onClick={handleExit}>
								<span className='material-symbols-outlined text-[1.2rem] hover:cursor-pointer'>close</span>
							</div>
						</div>
						<div className='w-full h-full py-10'>
							{feedback?.feedback}
							{feedback?.score}
						</div>
					</Card>
				</>
			) : null}
		</>
	);
};
