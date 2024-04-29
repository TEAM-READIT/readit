import { Button, Card, Dropdown } from 'flowbite-react';
import { useState } from 'react';
interface SearchFilterProps {
	handleFilterChange: (filter: string) => void;
}

const SearchFilter = ({ handleFilterChange }: SearchFilterProps) => {
	const [searchType, setSearchType] = useState<string>('title');
	const [keyword, setKeyword] = useState('');
	const [category, setCategory] = useState('');
	const [participant, setParticipant] = useState('');
	const handleApplyFilter = () => {
		const filter = {
			categoryName: category,
			participant:participant,
		};
		let filtered = '';
		if (searchType != '' && keyword) {
			filtered += `${searchType}=${keyword}$`;
		}
		if (filter.categoryName != '') {
			filtered += `categoryName=${category}$`;
		}
		if (filter.participant != ''){
			filtered += `maxParticipant=${participant}$`
		}
		// 마지막 & 제거
		filtered = filtered.slice(0, -1);

		handleFilterChange(filtered);
	};
	return (
		<>
			<div className='w-full h-full'>
				<div className='fixed top-50'>
					<div className='flex items-start h-full flex-row'>
						<Card>
							<div className='w-full flex flex-col gap-y-5'>
								<p className='font-semibold text-md border-b-2 border-gray-200 mb-2 pb-1'>검색 필터</p>
								<div className='flex flex-col gap-4'>
									<select name='category' className='select' onChange={(e) => setSearchType(e.target.value)}>
										<option value='title'>제목</option>
										<option value='content'>내용</option>
										<option value='writerName'>작성자</option>
									</select>
									<input
										type='text'
										name='keyword'
										placeholder='검색어'
										className='input'
										onChange={(e) => setKeyword(e.target.value)}
									/>
									<select name='category' className='select' onChange={(e) => setCategory(e.target.value)}>
										<option value=''>카테고리 선택</option>
										<option value='IT'>IT</option>
										<option value='인문'>인문</option>
										<option value='언어'>언어</option>
										<option value='사회'>사회</option>
										<option value='역사'>역사</option>
										<option value='과학'>과학</option>
										<option value='디자인'>디자인</option>
										<option value='교육'>교육</option>
										<option value='의예'>의예</option>
										<option value='예체능'>예체능</option>
										<option value='자기소개'>자기소개</option>
										<option value='자유주제'>자유주제</option>
									</select>
									<input
										type='number'
										name='maxParticipants'
										placeholder='최대 참여자 수'
										className='input'
										onChange={(e) => setParticipant(e.target.value)}
									/>
								</div>

								<Button className='border bg-blue-700 text-white border-blue-300 hover:bg-blue-800 '>
									<div className='flex items-center gap-2' onClick={handleApplyFilter}>
										<span className='material-symbols-outlined text-[1.2rem]'>search</span>
										<span>검색</span>
									</div>
								</Button>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
};

export default SearchFilter;
