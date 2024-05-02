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
	setIsMemoOpen,
}: {
	article: articleList;
	range: Range[];
	hightlightColor: string;
	setIsMemoOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const location = useLocation();
	const [selectionRanges, setSelectionRanges] = useState<Range[]>([]);
	const articleRef = useRef<HTMLDivElement>(null);

	const linkdata = location.state?.linkdata;

	useEffect(() => {
		if (!article) return;

		const newContent = applyHighlights(article.content);

		console.log('selectionRanges ------>', selectionRanges);
		// console.log("newContent ------>" + newContent);

		if (articleRef.current) {
			articleRef.current.innerHTML = newContent;
		}
	}, [selectionRanges, article]);

	const handleMouseUp = () => {
		const selection = window.getSelection();
		if (!selection?.rangeCount) return;

		const container = articleRef.current;
		if (container && selection.containsNode(container, true)) {
			let start: number = selection.anchorOffset;
			let end: number = selection.focusOffset;

			if (start > end) [start, end] = [end, start];

			if (start !== end) {
				const newRange = { start, end };
				setSelectionRanges((prevRanges) => [...prevRanges, newRange]);
			}
			selection.empty();
			// setIsMemoOpen(true);
		}
	};

	const applyHighlights = (text: string) => {
		const splits = text.split('');
		selectionRanges.forEach((range) => {
			if (range.start < splits.length && range.end <= splits.length) {
				splits[range.start] = `<span style="background-color: yellow;">${splits[range.start]}`;
			} if (range.end < splits.length) {
				splits[range.end] = `${splits[range.end]}</span>`;
			}
			 else {
				splits[splits.length - 1] += `</span>`;
			}
		});
		return splits.join('');
	};

	return (
		<div className='w-full h-full border-solid border-2 shadow-md bg-white overflow-y-auto'>
			{article ? (
				<>
					<div className='text-2xl font-bold m-[3%]'>{article.title}</div>
					<div ref={articleRef} className='text-start mx-[2%] mb-[3%]' onMouseUp={handleMouseUp} />
				</>
			) : (
				<>
					<div className='text-2xl font-bold m-[3%]'>{linkdata.title}</div>
					<div className='text-start mx-[2%] mb-[3%]'>{linkdata.content}</div>
				</>
			)}
		</div>
	);
};
