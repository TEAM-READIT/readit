import { Card } from 'flowbite-react';
import { useLocation } from 'react-router-dom';
import Headers from './Headers';
import ReadDetailModalHeaders from './ReadDetailModalHeaders';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/auth';

interface MemoList {
	id: number;
	content: string;
}

const ReadDetailModal = () => {
	const location = useLocation();
	const article = location.state?.article;
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const { accessToken } = useAuthStore();
	const [memo, setMemo] = useState<{ memoList: MemoList[] }>();

	const getMemo = async () => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};
		const response = await fetch(`${baseUrl}/article/memo/${article.id}`, {
			headers: headers,
		});
		const data = await response.json();
		return data;
	};

	const fetchMemo = async () => {
		try {
			const data = await getMemo();
			setMemo(data);
		} catch (error) {
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		fetchMemo();
	}, []);

	const memos = memo?.memoList;
	useEffect(() => {
		if (memos) {
			for (let i = 0; i < memos?.length!; i++) {
				var divElement = document.getElementById(i.toString());
				const spanMemoWrapper = document.createElement('span');
				spanMemoWrapper.className =
					'memo-wrapper z-50 text-black bg-white shadow-lg max-w-[500px] absolute rounded-lg text-center px-10 border flex flex-row'; // 클래스 추가

				// 메모를 표시하는 span 엘리먼트 생성
				const spanMemo = document.createElement('span');
				spanMemo.className = 'memo-span whitespace-pre-wrap';

				spanMemo.innerText = memos[i].content; // 메모 내용 설정

				spanMemoWrapper.style.display = 'none';

				// spanOriginal에 마우스 호버 이벤트 추가
				divElement?.addEventListener('mouseenter', (e) => {
					// 화면 중앙에 메모 표시
					spanMemoWrapper.style.visibility = 'visible';
					spanMemoWrapper.style.display = '';

					const mouseX = e.clientX;
					const mouseY = e.clientY + window.scrollY;
					spanMemoWrapper.style.left = `${mouseX}px`;
					spanMemoWrapper.style.top = `${mouseY}px`;
				});

				divElement?.addEventListener('mouseleave', () => {
					// 메모 숨기기
					spanMemoWrapper.style.visibility = 'hidden';
				});

				// spanMemoWrapper에 spanMemo 추가
				spanMemoWrapper.appendChild(spanMemo);

				// 문서 body에 spanMemoWrapper 추가
				document.body.appendChild(spanMemoWrapper);

				const computedStyle = window.getComputedStyle(spanMemoWrapper); // 계산된 스타일 가져오기
				const width = parseFloat(computedStyle.width); // 요소의 너비
				const height = parseFloat(computedStyle.height); // 요소의 높이
				// 필요에 따라 너비와 높이에 패딩, 여백 등을 추가하여 최종 크기를 조정할 수 있습니다.
				spanMemoWrapper.style.width = width + 'px';
				spanMemoWrapper.style.height = height + 'px';
				spanMemoWrapper.style.display = 'none';
			}
		}
	}, [memos]); // 빈 배열을 전달하여 이펙트가 한 번만 실행되도록 합니다.

	const linechange = (text: string) => {
		return text?.replace('못한 점', '\n못한 점');
	};

	const realfeedback = linechange(article.feedback);

	return (
		<>
			<div className='w-full h-full flex justify-center flex-col items-center whitespace-pre-wrap'>
				<Headers />
				<div className='flex flex-col w-3/5 justify-start items-center pb-20 '>
					<ReadDetailModalHeaders />
					<div className='flex flex-col gap-10  w-full'>
						<div className='font-bold text-2xl'>{article.title}</div>
						<div className='text-start flex flex-col gap-5'>
							<Card className='p-5'>
								<div
									className='leading-8 tracking-wide text-lg'
									id='text'
									dangerouslySetInnerHTML={{ __html: article.content }}
								></div>

								{/* {article.content.length > 750 ? <>{article.content.slice(0, 750)}...</> : <>{article.content}</>} */}
							</Card>
							<Card className=''>
								<div className='flex flex-col'>
									<div className='border-b border-b-grap-500 pb-2 px-5'>{article.summary}</div>
								</div>
								<div className='flex flex-col items-center'>
									<div className='relative w-full'>
										<span className='material-symbols-outlined absolute top-5 -left-3'>subdirectory_arrow_right </span>{' '}
									</div>
									<div className='flex flex-row items-center w-full px-5'>
										<span className=''>{realfeedback}</span>
									</div>
									<div className='flex flex-row justify-end w-full'>
										<span>{article.score} / 100</span>
									</div>
								</div>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ReadDetailModal;
