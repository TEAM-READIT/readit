import { useEffect, useState } from 'react';
import Headers from '../../components/Headers';
import UpArrow from '../../assets/images/up-arrow.png';
import DownArrow from '../../assets/images/down-arrow.png';
import { DictionarySearch } from './DictionarySearch';
import { TextBox } from './Summary/TextBox';
import { Memos } from './Memo/Memos';
import { Button, Card } from 'flowbite-react';
import { MainText } from './TextArea/MainText';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useAuthStore } from '../../store/auth';
import useModal from '../../hooks/useModal';

interface FeedBackProps {
	score: number;
	feedback: string;
}

interface wordListProps {
	word: string;
	definition: string;
}

interface RequestBody {
	content: string;
	summary: string;
	memoList: string[];
	communityId?: number;
}

export const ViewerPage = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const { accessToken } = useAuthStore();

	const [isBottomOpen, setBottomOpen] = useState(true);
	const location = useLocation();
	const [memos, setMemos] = useState<string[]>([]);
	const article = location.state?.article;
	const linkdata = location.state?.linkdata;
	const [id, setId] = useState<number>();
	const communityId = location.state?.communityId; // 커뮤니티 내에서 읽으려면 커뮤니티 아이디를 추가로 보내야되는데 어디다가?
	const navigate = useNavigate();
	const [wordList, setWordList] = useState<wordListProps[]>();
	const [isOpen, open, close] = useModal();
	// 요약한 내용
	const [summary, setSummary] = useState<string>('');
	// 피드백
	const [feedback, setFeedback] = useState<FeedBackProps>();
	// 하단 슬라이드 상태 값
	const toggleBottom = () => {
		setBottomOpen(!isBottomOpen);
	};

	const [change, setChange] = useState<number>(0);

	const total = document.querySelector('#text')?.outerHTML;
	// 어려운 단어 불러오기
	const fetchWord = async () => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};
		const response = await fetch(`${baseUrl}/viewer/${id}`, {
			headers: headers,
		});
		const data = await response.json();
		setWordList(data)
		return data;
	};

	useEffect(() => {}, [
		change,
		// setId
	]);
	useEffect(() => {
		if (id) {
			fetchWord();
		}
	}, [id]);
	useEffect(() => {
		// fetchUnreadData();
		if (article?.id) {
			setId(article.id);
		} else {
			setId(linkdata.id);
		}
	}, []);
	// 제출 POST
	const requestbody: RequestBody = {
		content: total!,
		summary: summary,
		memoList: memos,
	};
	if (communityId) {
		requestbody.communityId = communityId;
	}

	const summarySubmit = useMutation(async () => {
		const response = await fetch(`${baseUrl}/viewer/submission/${id}`, {
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
		await fetch(`${baseUrl}/viewer/temp/${id}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestbody),
		});
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
					<div className={` relative flex flex-col w-5/6 h-screen transition-all duration-300 ease-in-out`}>
						<div
							className={`relative flex w-full ${isBottomOpen ? 'h-3/5' : 'h-[88%]'} transition-all duration-300 ease-in-out`}
						>
							<DictionarySearch />
							<div className='w-full h-full relative'>
								{linkdata ? (
									<>
										<MainText setMemos={setMemos} article={linkdata} setChange={setChange} wordList={wordList} />
									</>
								) : (
									<MainText setMemos={setMemos} article={article} setChange={setChange} wordList={wordList} />
								)}
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
					<div className='relative flex h-screen transition-all duration-300 ease-in-out border-solid border-2 w-1/6'>
						<div className='w-full h-full transition-all duration-300 ease-in-out block '>
							<div className='overflow-y-auto overflow-x-hidden h-[85%] p-10'>
								<Memos memos={memos} />
							</div>
							<div className='flex flex-row items-center w-full justify-center px-10 gap-5  '>
								<Button
									className='w-full border bg-gray-400 text-white border-gray-300 hover:bg-gray-500 '
									onClick={handleTempSubmit}
								>
									<div className='flex items-center'>
										<span>임시 저장</span>
									</div>
								</Button>
								<Button
									className='w-full border bg-blue-700 text-white border-blue-300 hover:bg-blue-800'
									onClick={handleSubmit}
								>
									<div className='flex items-center'>
										<span>제출</span>
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
						<div className='w-full h-full p-10 flex flex-col justify-between pt-20'>
							{summarySubmit.isLoading ? (
								<>
									글을 분석하고 있습니다
									<div role='status'>
										<svg
											aria-hidden='true'
											className='inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
											viewBox='0 0 100 101'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
												fill='currentColor'
											/>
											<path
												d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
												fill='currentFill'
											/>
										</svg>
										<span className='sr-only'>Loading...</span>
									</div>
								</>
							) : (
								<>
									<div className='text-start'>요약 : {summary}</div>
									<div className='text-start'>{feedback?.feedback}</div>
									<div className='flex flex-row justify-end'>
										<span>{feedback?.score} / 100</span>
									</div>
									<div className='flex flex-row justify-end'>
										<div className='flex flex-row justify-between gap-5 h-10'>
											<button
												className=' rounded-lg  text-center flex flex-row justify-center items-center text-sm  border bg-gray-500 text-white border-gray-500 hover:bg-gray-400 px-3 '
												onClick={() => navigate('/')}
											>
												<div className='flex items-center gap-2'>
													<span>홈으로 이동하기</span>
												</div>
											</button>
											<button
												className=' rounded-lg  text-center flex flex-row justify-center items-center text-sm  border bg-blue-700 text-white border-blue-300 hover:bg-blue-800 px-3'
												onClick={() => navigate('/essay')}
											>
												<div className='flex items-center gap-2'>
													<span>글 더 읽으러 가기</span>
												</div>
											</button>
										</div>
									</div>
								</>
							)}
						</div>
					</Card>
				</>
			) : null}
		</>
	);
};
