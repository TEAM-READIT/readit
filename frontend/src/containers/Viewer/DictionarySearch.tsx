import { useState } from 'react';
import Pencil from '../../assets/images/pencil.png';
import Highlight from '../../assets/images/highlight.png';
import Eraser from '../../assets/images/eraser.png';
import pencilCursor from '../../assets/images/google.png';
import useModal from '../../hooks/useModal';
interface Dictionary {
	word: string;
	definition: string;
}

export const DictionarySearch = ({ setColor }: { setColor: React.Dispatch<React.SetStateAction<string>> }) => {
	const [isOpen, open, close] = useModal();
	const [searchWord, setSearchWord] = useState('');
	const [history, setHistory] = useState<Dictionary[]>([]); // history 배열을 useState를 이용하여 관리
	// const dictionaryData: Dictionary = {
	// 	word: '금융',
	// 	definition: '금전을 융통하는 일. 특히 이자를 붙여서 자금을 대차하는 일과 그 수급 관계를 이른다.',
	// };
	const [dictionaryData, setDictionaryData] = useState<Dictionary>();
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;

	// 단어 검색하기
	const WordData = async () => {
		const data = await fetch(`${baseUrl}/viewer/word/${searchWord}`).then((response) => response.json());
		return data;
	};
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleWordSearch();
		}
	};

	const handleWordSearch = () => {
		WordData()
			.then((res) => {
				setDictionaryData(res), setHistory((prevHistory) => [...prevHistory, res]);
			})
			.catch((err) => {
				console.log('단어 검색하는거 에러');
			});
		console.log(history);
	};

	const changeCursorPencil = () => {
		console.log('ㅋㅋ');
		document.body.style.cursor = `url(${pencilCursor}), auto`;
	};

	return (
		<>
			<div className={`relative flex flex-col w-1/5 h-full justify-between`}>
				<div className='w-full h-full border-solid overflow-auto border p-[1vw]'>
					<div className='flex w-full justify-center items-center pt-5'>
						<input
							type='search'
							className='w-[90%] m-[0.5vw] block rounded border border-solid border-neutral-200 bg-transparent bg-clip-padding py-[0.2rem] font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-white dark:placeholder:text-neutral-200 dark:autofill:shadow-autofill dark:focus:border-primary'
							placeholder='검색할 단어 입력'
							onChange={(e) => setSearchWord(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
						<span className='material-symbols-outlined text-[1.2rem] hover:cursor-pointer' onClick={handleWordSearch}>
							search
						</span>
					</div>
					<div className='flex flex-col p-[1.5vw]  gap-5 text-start'>
						<h3 className='font-bold text-lg'>{dictionaryData?.word}</h3>
						<div className=''>{dictionaryData?.definition}</div>
						<div>
							{history
								?.slice(0, -1)
								.reverse()
								.map((word, index) => (
									<div key={index} className='flex flex-col py-2'>
										<div className='font-bold text-lg'>{word.word}</div>
										<div>{word.definition}</div>
									</div>
								))}
						</div>
					</div>
				</div>
				<div className='flex items-center justify-center w-full p-2 border-solid border gap-[15%]'>
					<button type='button'>
						<img src={Pencil} />
					</button>
					<button className='relative' type='button'>
						<img src={Highlight} onClick={open} />
						{isOpen ? (
							<div className='absolute bottom-10 -left-5 border border-gray rounded-xl flex flex-col bg-gray-200 p-2 gap-2 '>
								<div className='flex flex-row gap-2'>
									<div
										className='w-8 aspect-square bg-yellow-200 border border-yellow-400 rounded-xl'
										onClick={() => {
											setColor(`yellow`);
											close();
										}}
									></div>
									<div
										className='w-8 aspect-square bg-pink-200  border border-pink-400 rounded-xl'
										onClick={() => {
											setColor(`pink`);
											close();
										}}
									></div>
									<div
										className='w-8 aspect-square bg-red-200 border border-red-400 rounded-xl'
										onClick={() => {
											setColor(`skyblue`);
											close();
										}}
									></div>
								</div>
							</div>
						) : null}
					</button>
					<button type='button'>
						<img src={Eraser} />
					</button>
				</div>
			</div>
		</>
	);
};
