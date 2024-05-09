import { Card } from 'flowbite-react';
import { useLocation } from 'react-router-dom';
import Headers from './Headers';
import ReadDetailModalHeaders from './ReadDetailModalHeaders';
import { useEffect } from 'react';

const ReadDetailModal = () => {
	const location = useLocation();
	const article = location.state?.article;
const memo = '123123'
	useEffect(() => {
		var divElement = document.getElementById('1');
		const spanMemoWrapper = document.createElement('span');
		spanMemoWrapper.className =
			'memo-wrapper z-50 text-black bg-white shadow-xl h-[30px] max-w-[500px] absolute rounded-lg text-center px-10 border '; // 클래스 추가

		// 메모를 표시하는 span 엘리먼트 생성
		const spanMemo = document.createElement('span');
		spanMemo.className = 'memo-span';
		if (memo.length > 15) {
			spanMemo.innerText = memo.slice(0, 15) + '...';
		} else {
			spanMemo.innerText = memo; // 메모 내용 설정
		}
		spanMemoWrapper.style.display = 'none';

		// spanOriginal에 마우스 호버 이벤트 추가
		divElement?.addEventListener('mouseenter', (e) => {
			// 화면 중앙에 메모 표시
			spanMemoWrapper.style.visibility = 'visible';
			spanMemoWrapper.style.display = '';

			const mouseX = e.clientX;
			const mouseY = e.clientY;
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

	}, []); // 빈 배열을 전달하여 이펙트가 한 번만 실행되도록 합니다.

	return (
		<>
			<div className='w-full h-full flex justify-center flex-col items-center'>
				<Headers />
				<div className='flex flex-col w-3/5 justify-start items-center pb-20 '>
					<ReadDetailModalHeaders />
					<div className='flex flex-col gap-10  w-full'>
						<div className='font-bold text-2xl'>{article.title}</div>
						<div className='text-start flex flex-col gap-5'>
							<Card className=''>
								<div id='text' dangerouslySetInnerHTML={{ __html: article.content }}></div>

								{/* {article.content.length > 750 ? <>{article.content.slice(0, 750)}...</> : <>{article.content}</>} */}
							</Card>
							<Card className=''>
								<div className='flex flex-col'>
									<div className='border-b border-b-grap-500 pb-2'>{article.summary}</div>
								</div>
								<div className='flex flex-col justify-between items-center'>
									<div className='flex flex-row items-center gap-1'>
										<span className='material-symbols-outlined'>subdirectory_arrow_right </span>{' '}
										<span>{article.feedback}</span>
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
