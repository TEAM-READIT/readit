import { useState } from 'react';
import { useAuthStore } from '../../store/auth';

interface Dictionary {
	word: string;
	definition: string;
}

export const DictionarySearch = () => {
	const [searchWord, setSearchWord] = useState('');
	const [history, setHistory] = useState<Dictionary[]>([]); // history 배열을 useState를 이용하여 관리
	const {accessToken} = useAuthStore();
	const [dictionaryData, setDictionaryData] = useState<Dictionary>();
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const WordData = async () => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};
		const response = await fetch(`${baseUrl}/viewer/word/${searchWord}`, {
			headers: headers,
		});
		const data = await response.json();
		return data;
	};


	// 단어 검색하기

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleWordSearch();
		}
	};

	const handleWordSearch = () => {
		WordData()
			.then((res) => {
				if (res.status === 500) {
					alert('없는 단어 입니다')
					return
				}
				setDictionaryData(res), setHistory((prevHistory) => [...prevHistory, res]);
			})
			.catch((_err) => {
				console.log('단어 검색하는거 에러');
			});
	};



	return (
		<>
			<div className={`relative flex flex-col w-1/6 h-full justify-between`}>
				<div className='w-full h-full border-solid overflow-auto border p-[1vw]'>
					<div className='flex w-full justify-center items-center pt-5'>
						<input
							type='search'
							className='text-sm w-[90%] m-[0.5vw] block rounded border border-solid border-neutral-200 bg-transparent bg-clip-padding py-[0.2rem] font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-white dark:placeholder:text-neutral-200 dark:autofill:shadow-autofill dark:focus:border-primary'
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

			</div>
		</>
	);
};
