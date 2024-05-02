import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { articleList } from '../../../types/articleProps';
interface Range {
	start: number;
	end: number;
}

interface MainTextProps {
	color: string;
	startIndex: number;
	endIndex: number;
}

export const MainText = ({
	article,
	range,
	hightlightColor,
}: {
	article: articleList;
	range: MainTextProps[];
	hightlightColor: string;
}) => {
	const location = useLocation(); // React Router hook을 사용하여 현재 경로의 위치 정보를 가져옵니다.
	const [selectionRanges, setSelectionRanges] = useState<Range[]>([]); // 선택된 텍스트 범위를 저장할 상태를 초기화합니다. 이 배열은 시작점과 끝점을 가진 객체들의 배열입니다.
	const articleRef = useRef<HTMLDivElement>(null); // article 내용을 포함하는 div 요소의 참조를 저장합니다.

	const linkdata = location.state?.linkdata;

	const handleMouseUp = () => {
		// 사용자가 마우스 클릭을 놓을 때 호출되는 함수입니다.
		const selection = window.getSelection(); // 브라우저의 선택 기능을 사용하여 현재 선택된 텍스트 정보를 가져옵니다.
		if (!selection?.rangeCount) return; // 선택된 범위가 없으면 함수를 종료합니다.

		const range = selection.getRangeAt(0); // 선택된 첫 번째 범위를 가져옵니다.
		const container = articleRef.current; // div 요소의 현재 참조를 container 변수에 할당합니다.

		console.log('range ---->>>' + range);
		console.log('container ------------------------> ' + container);

		if (container) {
			// container가 존재하는 경우에만 로직을 수행합니다.
			const start = range.startOffset; // 선택된 텍스트의 시작 위치를 가져옵니다.
			const end = range.endOffset; // 선택된 텍스트의 끝 위치를 가져옵니다.

			if (start !== end) {
				// 시작 위치와 끝 위치가 다를 때만(즉, 실제로 텍스트가 선택되었을 때만) 실행합니다.
				const newRange = { start, end }; // 새로운 범위 객체를 생성합니다.
				setSelectionRanges((prevRanges) => [...prevRanges, newRange]); // 이전 범위 배열에 새 범위를 추가하여 상태를 업데이트합니다.
			}
			selection.empty(); // 현재 선택을 제거합니다. 이는 다음 선택을 위해 현재 선택을 클리어하는 것입니다.

			console.log({ start, end });
		}
	};

	useEffect(() => {
		const container = articleRef.current;
		if (container && container.textContent && selectionRanges.length > 0) {
			let lastIndex = 0;
			const highlightedText = selectionRanges.reduce((acc, range) => {
				const startText = article.content.slice(lastIndex, range.start);
				const highlighted = article.content.slice(range.start, range.end);
				lastIndex = range.end;
				return `${acc}${startText}<span class='bg-yellow-300'>${highlighted}</span>`;
			}, '');
			container.innerHTML = `${highlightedText}${article.content.slice(lastIndex)}`;
		}
	}, [selectionRanges, article.content]);

	return (
		<>
			<div className='w-full h-full border-solid border-2 shadow-md bg-white overflow-y-auto'>
				{article ? (
					<>
						<div className='text-2xl font-bold m-[3%]'>{article.title}</div>
						<div
							ref={articleRef}
							className='text-start mx-[2%] mb-[3%]'
							onMouseUp={handleMouseUp}
							dangerouslySetInnerHTML={{ __html: article.content }}
						/>
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
