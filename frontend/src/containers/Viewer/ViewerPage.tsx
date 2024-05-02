import { useState } from 'react';
import Headers from '../../components/Headers';
import RightArrow from '../../assets/images/right-arrow.png';
import LeftArrow from '../../assets/images/left-arrow.png';
import UpArrow from '../../assets/images/up-arrow.png';
import DownArrow from '../../assets/images/down-arrow.png';
import Pencil from '../../assets/images/pencil.png';
import Highlight from '../../assets/images/highlight.png';
import Eraser from '../../assets/images/eraser.png';
import { DictionarySearch } from './DictionarySearch';
import { TextBox } from './Summary/TextBox';
import { Memos } from './Memo/Memos';
import { Button, Card } from 'flowbite-react';
import { MainText } from './TextArea/MainText';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { useAuthStore } from '../../store/auth';
import useModal from '../../hooks/useModal';
import { articleList } from '../../types/articleProps';

interface FeedBackProps {
	score: number;
	feedback: string;
}

interface wordListProps {
	word: string;
	definition: string;
}
interface SummaryProps {
  color: string;
  content: string;
  startIndex: number;
  endIndex: number;
}

interface RequestBody {
  memoList: SummaryProps[];
  summary: string; // summary의 타입에 따라 수정해야 합니다.
}
interface MainTextProps {
	color: string;
	startIndex: number;
	endIndex: number;
}
interface MemoProps{
	content: string;
}
export const ViewerPage = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const { accessToken } = useAuthStore();
	const [isRightOpen, setRightOpen] = useState(true);
	const [isBottomOpen, setBottomOpen] = useState(true);
	const [color, setColor] = useState<string>('yellow'); // 형광펜 색갈 지정 지금은 딕셔너리 안에 있는데 추후에 빼야할 수도 있어요
	const location = useLocation();
		const [highlightedRanges, setHighlightedRanges] = useState<MainTextProps[]>([]);

	const article = location.state?.article;
	const communityId = location.state?.communityId; // 커뮤니티 내에서 읽으려면 커뮤니티 아이디를 추가로 보내야되는데 어디다가?
	const navigate = useNavigate();
	const [wordList, setWordList] = useState<wordListProps[]>();
	const [isOpen, open, close] = useModal();
	const [isMemoOpen, setIsMemoOpen] = useState<boolean>(false);
	// 요약한 내용
	const [summary, setSummary] = useState<string>('');
	// 피드백
	const [feedback, setFeedback] = useState<FeedBackProps>();
	// 오른쪽 슬라이드 상태 값
	const toggleRight = () => {
		setRightOpen(!isRightOpen);
	};
	const [newMemo, setNewMemo] = useState<string[]>([]); // 메모 저장할 곳 
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
		memoList: [],
		summary: summary,
	};

	// highlightedRanges 순회
	for (let i = 0; i < highlightedRanges.length; i++) {
		const { color, startIndex, endIndex } = highlightedRanges[i];

		// memoList에 객체 추가
		requestbody.memoList.push({
			color: color,
			content: newMemo[i],
			startIndex: startIndex,
			endIndex: endIndex,
		});
	}

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
			const data = await tempSubmit.mutateAsync();
		} catch (error) {
			console.error('임시저장 실패', error);
		}
	};

	//TODO: 점수 보고 어디로 이동해야될가요?
	const handleExit = () => {
		close();
		navigate('/');
	};

	console.log(requestbody)

	return (
		<>
			<div className='w-full h-screen flex flex-col items-center border overflow-hidden'>
				<Headers />
				<div className='relative flex'>
					<div
						className={`relative flex flex-col w-${isRightOpen ? '4/5' : 'full'} h-screen transition-all duration-300 ease-in-out`}
					>
						<div
							className={`relative flex w-full ${isBottomOpen ? 'h-3/5' : 'h-[88%]'} transition-all duration-300 ease-in-out`}
						>
							<DictionarySearch setColor={setColor} />
							<div className='w-4/5 h-full border-solid border-2 px-[5%] pt-[3%] pb-[5%]'>
								<div className='w-full h-full overflow-y-auto'>
									<MainText
										highlightedRanges={highlightedRanges}
										setHighlightedRanges={setHighlightedRanges}
										color={color}
										article={article}
										setIsMemoOpen={setIsMemoOpen}
									/>
								</div>
							</div>
						</div>
						<div
							className={`relative flex flex-col transition-all duration-300 ease-in-out ${isBottomOpen ? 'h-1/3' : 'h-1/12'}`}
						>
							<div className='w-full h-1/12 flex justify-center' onClick={toggleBottom}>
								<img src={isBottomOpen ? DownArrow : UpArrow} />
							</div>
							<div
								className={`w-full h-full p-[1vw] transition-all duration-300 ease-in-out border-solid border-2 ${isBottomOpen ? 'block' : 'hidden'}`}
							>
								<TextBox setSummary={setSummary} />
							</div>
						</div>
					</div>
					<div
						className={`relative flex h-screen transition-all duration-300 ease-in-out border-solid border-2 ${isRightOpen ? 'w-1/5' : 'w-1/24'}`}
					>
						<div className='h-screen bg-white flex items-center' onClick={toggleRight}>
							<img src={isRightOpen ? RightArrow : LeftArrow} />
						</div>
						<div
							className={`w-11/12 h-full transition-all duration-300 ease-in-out ${isRightOpen ? 'block' : 'hidden'}`}
						>
							<Memos
								color={color}
								setIsMemoOpen={setIsMemoOpen}
								isMemoOpen={isMemoOpen}
								highlightedRanges={highlightedRanges}
								newMemo={newMemo}
								setNewMemo={setNewMemo}
							/>
							<div className='flex flex-row items-center w-full'>
								<div className='w-1/2 m-[10%]'>
									<Button className='w-full border bg-gray-400 text-white border-gray-300 hover:bg-gray-500'>
										<div className='flex items-center'>
											<span onClick={handleTempSubmit}>임시 저장</span>
										</div>
									</Button>
								</div>
								<div className='w-1/2 mx-[10%]'>
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
