import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { articleList } from '../../../types/articleProps';

interface MainTextProps {
	color: string;
	startIndex: number;
	endIndex: number;
}

export const MainText = ({
	color,
	article,
	setIsMemoOpen,
	highlightedRanges,
	setHighlightedRanges,
}: {
	color: string;
	article: articleList;
	setIsMemoOpen: React.Dispatch<React.SetStateAction<boolean>>;
	highlightedRanges: MainTextProps[],
	setHighlightedRanges: React.Dispatch<React.SetStateAction<MainTextProps[]>>;
}) => {
	const location = useLocation();
	const linkdata = location.state?.linkdata;

useEffect(() => {
	highlightedRanges.forEach((range) => {
		const selection = window.getSelection();
		if (selection!.rangeCount > 0) {
			const range = selection!.getRangeAt(0);
			// const span = document.createElement('span');
			// span.style.backgroundColor = `${color}`;
			// range.surroundContents(span);
			selection!.removeAllRanges();
		}
	});
}, [highlightedRanges]);


	const handleMouseUp = () => {
		const selection = window.getSelection();
		if (selection!.rangeCount > 0) {
			const range = selection!.getRangeAt(0);
			const startIndex = range.startOffset;
			// const span = document.createElement('span');
			const endIndex = range.endOffset;
			// span.style.backgroundColor = `${color}`;
			// range.surroundContents(span);
			setHighlightedRanges([...highlightedRanges, { startIndex, endIndex, color }]);
			setIsMemoOpen(true);
		}
	};
	console.log('highlightedRanges', highlightedRanges);
	return (
		<div className='w-full h-full border-solid border-2 shadow-md bg-white overflow-y-auto'>
			{article ? (
				<>
					<div className='text-2xl font-bold m-[3%]'>{article.title}</div>
					<div className='text-start mx-[2%] mb-[3%]' onMouseUp={handleMouseUp}>
						{highlightedRanges?.length > 0 ? (
							<>
								{highlightedRanges.map((hi, index) => (
									<div key={index}>
											{article.content.slice(0, hi.startIndex)}
										<div className={`bg-${hi.color}-200`}>
											{article.content.slice(hi.startIndex, hi.endIndex + 1)}
										</div>
											{article.content.slice(hi.endIndex + 1, )}
									</div>
								))}
							</>
						) : (
							<>{article.content}</>
						)}
					</div>
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
