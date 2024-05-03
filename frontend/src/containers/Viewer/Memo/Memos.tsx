import { useEffect, useState } from "react";

interface MemoList {
	color: string;
	startIndex: number;
	endIndex: number;
}

interface MemoProps {
	content: string;
}

export const Memos = ({
	newMemo,
	setNewMemo,
	highlightedRanges,
	color,
	isMemoOpen,
	setIsMemoOpen,
}: {
	newMemo: string[];
	setNewMemo: React.Dispatch<React.SetStateAction<string[]>>;
	highlightedRanges: MemoList[];
	color: string;
	isMemoOpen: boolean;
	setIsMemoOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleNewMemo();
			setIsMemoOpen(false);
		}
	};
	useEffect(() => {}, [handleKeyDown]);
	const [memo, setMemo] = useState('');

	const handleNewMemo = () => {

		setNewMemo([...newMemo, memo]);
	};

	return (
		<>
			<div className='overflow-auto h-4/5 pb-10'>
				{highlightedRanges.map((myMemo, index) => (
					<div
						key={index}
						className={`w-[80%] h-auto py-[4%] px-[7%] mx-[10%] mt-[15%] bg-${myMemo.color}-200 shadow-md text-start`}
					>
						<div className='p-[5%]'>{newMemo[index]}</div>
					</div>
				))}
			</div>
			{isMemoOpen ? (
				<textarea
					className={`absolute z-50 top-10 left-10  bg-${color}-200 shadow-md w-[300px] h-[300px] text-start`}
					onChange={(e) => {
						setMemo(e.target.value);
					}}
					onKeyDown={handleKeyDown}
				></textarea>
			) : null}
		</>
	);
};
