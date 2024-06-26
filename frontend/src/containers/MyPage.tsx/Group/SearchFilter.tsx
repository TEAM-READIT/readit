import { Button, Card, Dropdown } from 'flowbite-react';
import { useState } from 'react';

const SearchFilter = () => {
	const [searchType, setSearchType] = useState<string | null>('title');
	const filters = [
		{
			name: '제목',
			value: 'title',
		},
		{
			name: '작성자',
			value: 'writerName',
		},
		{
			name: '내용',
			value: 'content',
		},
	];
	return (
		<>
			<div className='w-full h-full'>
				<div className='fixed top-50'>
					<div className='flex items-start h-full flex-row'>
						<Card>
							<div className='w-full flex flex-col gap-y-5'>
								<p className='font-semibold text-md border-b-2 border-gray-200 mb-2 pb-1'>검색 필터</p>
								<div className='flex flex-col gap-4'>
									<Dropdown color='teal' label={filters.find((x) => x.value === searchType)?.name || '검색 유형 선택'}>
										{filters.map((filter) => (
											<Dropdown.Item
												key={filter.value}
												onClick={() => {
													setSearchType(filter.value);
												}}
											>
												{filter.name}
											</Dropdown.Item>
										))}
									</Dropdown>
									<input type='text' name='keyword' placeholder='검색어' className='input' />
									<select name='category' className='select'>
										<option value=''>카테고리 선택</option>
										<option value='비문학'>비문학</option>
										<option value='정치'>정치</option>
										<option value='경제'>경제</option>
										<option value='사회'>사회</option>
										<option value='생활/문화'>생활/문화</option>
										<option value='IT/과학'>IT/과학</option>
										<option value='세계'>세계</option>
										<option value='오피니언'>오피니언</option>
									</select>
									<input type='number' name='maxParticipants' placeholder='최대 참여자 수' className='input' />
								</div>
								<Button className='border bg-blue-700 text-white border-blue-300 hover:bg-blue-800 '>
									<div className='flex items-center gap-2'>
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
