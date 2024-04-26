interface Dictionary {
	word: string;
	definition: string;
}

export const SearchWord = () => {
	const dictionaryData: Dictionary = {
		word: '금융',
		definition: '금전을 융통하는 일. 특히 이자를 붙여서 자금을 대차하는 일과 그 수급 관계를 이른다.',
	};
	return (
		<>
			<div className='flex flex-col pt-[3vw] px-[1.5vw]'>
				<h3>{dictionaryData.word}</h3>
				<div className="pt-[2vw]">{dictionaryData.definition}</div>
			</div>
		</>
	);
};
