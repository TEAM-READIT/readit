import {
	useState,
	// useEffect, useRef

} from 'react';
import { useLocation } from 'react-router-dom';
import { articleList } from '../../../types/articleProps';
import useModal from '../../../hooks/useModal';

export const MainText = ({
	article,
	setMemos,
}: {
	article: articleList;
	setMemos: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
	const [isOpen, open, close] = useModal();
	const location = useLocation();
	const linkdata = location.state?.linkdata;
	const [position, setPosition] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
	const [selectedRange, setSelectedRange] = useState<Range | null>(null); // State to store the selected range
	const [openMemo, setOpenMemo] = useState<boolean>(false);
	const [openMenu, setOpenMenu] = useState<boolean>(false);
	const [memo, setMemo] = useState('');
	// useEffect(() => {
	// 	highlightedRanges.forEach((range) => {
	// 		const selection = window.getSelection();
	// 		if (selection!.rangeCount > 0) {
	// 			const range = selection!.getRangeAt(0);
	// 			const span = document.createElement('span');
	// 			span.style.backgroundColor = `${color}`;
	// 			range.surroundContents(span);
	// 			selection!.removeAllRanges();
	// 		}
	// 	});
	// }, [highlightedRanges]);

	// const total = document.querySelector('#text');
	const handleBold = () => {
		if (selectedRange) {
			const span = document.createElement('span');
			span.style.fontWeight = 'bold';
			selectedRange.surroundContents(span);
			setOpenMenu(false);
		}
	};
	const setColor = (color: string) => {
		if (selectedRange) {
			const span = document.createElement('span');
			span.style.backgroundColor = color;
			selectedRange.surroundContents(span);
			setOpenMenu(false);
		}
	};
	const handleMouseUp = () => {
		const selection = window.getSelection();
		if (selection!.rangeCount > 0) {
			const range = selection!.getRangeAt(0);
			setSelectedRange(range);
			setOpenMenu(true);
			const rect = range.getBoundingClientRect();

			const buttonX = rect.right;
			const buttonY = rect.top - 30;

			setPosition({
				x: buttonX - 520,
				y: buttonY - 150,
				width: rect.width,
				height: rect.height,
			});

			// setIsMemoOpen(true);
		}
	};
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			setMemos((prevMemos) => [...prevMemos, memo]);

			makeMemo(memo);
			setOpenMemo(false);
			setOpenMenu(false);
		}
	};

	const makeMemo = (memo: string) => {
		if (selectedRange) {
			// 원래 텍스트를 감싸는 span 엘리먼트 생성
			const spanOriginal = document.createElement('span');
			spanOriginal.className = 'hover:cursor-pointer shadow-xl border-b border-black'; // 클래스 추가

			// 메모를 감싸는 span 엘리먼트 생성
			const spanMemoWrapper = document.createElement('span');
			spanMemoWrapper.className =
				'memo-wrapper z-50 text-black bg-white shadow-xl h-[30px] max-w-[500px] absolute rounded-lg text-center px-10 border border-black'; // 클래스 추가

			// 메모를 표시하는 span 엘리먼트 생성
			const spanMemo = document.createElement('span');
			spanMemo.className = 'memo-span';
			if (memo.length > 15) {
				spanMemo.innerText = memo.slice(0, 15) + '...';
			} else {
				spanMemo.innerText = memo; // 메모 내용 설정
			}

			// 선택된 텍스트를 spanOriginal에 감싸기
			selectedRange.surroundContents(spanOriginal);
			spanMemoWrapper.style.display = 'none';

			// spanOriginal에 마우스 호버 이벤트 추가
			spanOriginal.addEventListener('mouseenter', (e) => {
				// 화면 중앙에 메모 표시
				spanMemoWrapper.style.visibility = 'visible';
							spanMemoWrapper.style.display = '';

				const mouseX = e.clientX;
				const mouseY = e.clientY;
				spanMemoWrapper.style.left = `${mouseX}px`;
				spanMemoWrapper.style.top = `${mouseY}px`;
			});

			spanOriginal.addEventListener('mouseleave', () => {
				// 메모 숨기기
				spanMemoWrapper.style.visibility = 'hidden';
			});

			// spanMemoWrapper에 spanMemo 추가
			spanMemoWrapper.appendChild(spanMemo);

			// 문서 body에 spanMemoWrapper 추가
			document.body.appendChild(spanMemoWrapper);
		}
	};

	//텍스트 줄바꿈
	const linechange = (text: string) => {
		return text.replace(/\n/g, '\n\n');
	};

	const realarticle = linechange(article.content);
	return (
		<>
			<div className=' w-full h-full border-solid border-2 shadow-md bg-white overflow-y-auto whitespace-pre-wrap px-3'>
				{openMenu ? (
					<>
						{position && (
							<div
								className='absolute top-0 left-0 w-[100px] h-[40px] bg-white text-black rounded m-0 border border-black items-center justify-center'
								style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
							>
								<div className='flex flex-row justify-between p-2 items-center'>
									<span className='text-black font-bold hover:cursor-pointer' onClick={handleBold}>
										B
									</span>
									<span className='material-symbols-outlined hover:cursor-pointer' onClick={open}>
										format_ink_highlighter
									</span>
									<span className='material-symbols-outlined hover:cursor-pointer' onClick={() => setOpenMemo(true)}>
										edit_note
									</span>

									{openMemo ? (
										<>
											<textarea
												className={`absolute z-50 top-10 left-10 shadow-md w-[300px] h-[100px] text-start`}
												onChange={(e) => {
													setMemo(e.target.value);
												}}
												onKeyDown={handleKeyDown}
											>
											</textarea>
												<span
													className='text-sm aspect-square absolute -top-3 right-0  rounded bg-whit material-symbols-outlined hover:cursor-pointer'
													onClick={close}
												>
													close
												</span>
										</>
									) : null}
									{isOpen ? (
										<div className='absolute bottom-10 left-10 border border-gray rounded-xl flex flex-col bg-white p-2 gap-2 opacity-100'>
											<div className='flex flex-row gap-2'>
												<div
													className='w-8 aspect-square bg-yellow-200 border border-yellow-400 rounded-xl hover:cursor-pointer'
													onClick={() => {
														setColor(`yellow`);
														close();
													}}
												></div>
												<div
													className='w-8 aspect-square bg-pink-200  border border-pink-400 rounded-xl hover:cursor-pointer'
													onClick={() => {
														setColor(`pink`);
														close();
													}}
												></div>
												<div
													className='w-8 aspect-square bg-blue-200 border border-blue-400 rounded-xl hover:cursor-pointer'
													onClick={() => {
														setColor(`skyblue`);
														close();
													}}
												></div>
												<span
													className='text-sm aspect-square absolute -top-3 right-0  rounded bg-whit material-symbols-outlined hover:cursor-pointer'
													onClick={close}
												>
													close
												</span>
											</div>
										</div>
									) : null}
								</div>
							</div>
						)}
					</>
				) : null}

				{article ? (
					<>
						<div className='text-2xl font-bold m-[3%]'>{article.title}</div>
						<div id='text' className='text-start mx-[2%] mb-[3%]' onMouseUp={handleMouseUp}>
							<>{realarticle}</>
						</div>
					</>
				) : (
					<>
						<div className='text-2xl font-bold m-[3%]'>{linkdata.title}</div>
						<div className='text-start mx-[2%] mb-[3%]'>{linkdata.content}</div>
					</>
				)}
			</div>
		</>
	);
};
