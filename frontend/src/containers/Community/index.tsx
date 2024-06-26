import Headers from '../../components/Headers';
import { Card } from 'flowbite-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import CommunityList from '../../types/communityProps';
import CommunityHeader from './CommunityHeader';
import useStore from '../../store';
import topbtn from '../../assets/images/topbtn.png';

const Community = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const { accessToken } = useAuthStore();
	// const [ishit, setIshit] = useState<boolean>(false);
	const observerRef = useRef(null);
	let filtered = '';

	// 한 페이지에 표시할 데이터(기사) 수 및 페이지 번호 설정
	const limit = 12;
	const [page, setPage] = useState<number>(0);
	const [totalCommunity, setTotalCommunity] = useState<{ communityList: CommunityList[]; hasNext: boolean }>();
	const { communityfilter, setCommunityfilter } = useStore();
	useEffect(() => {
		if (communityfilter) {
			filtered = communityfilter;
		}
	}, []);

	// // 전체 커뮤니티 조회
	const totalCommunityData = async (page: number, filtered: string) => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};
		const response = await fetch(`${baseUrl}/community/list?${filtered}&cursor=${page}&limit=${limit}`, {
			headers: headers,
		});
		const data = await response.json();
		return data;
	};

	useEffect(() => {
		totalCommunityData(page, filtered);
	}, []);

	// 조회수 ++
	const hits = useMutation(async (id: number) => {
		await fetch(`${baseUrl}/community/hits/${id}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		});
	});
	const handlehits = async (id: number) => {
		try {
			await hits.mutateAsync(id);
		} catch (error) {}
	};

	// 검색 필터 또는 페이지 변경 시 데이터 다시 불러오기
	const fetchData = async (filtered: string) => {
		try {
			const data = await totalCommunityData(0, filtered);
			setTotalCommunity({ communityList: data.communityList, hasNext: data.hasNext });
			setCommunityfilter(filtered);
			window.scrollTo(0, 0);
		} catch (error) {}
	};

	useEffect(() => {
		fetchData;
	}, []);

	// 무한 스크롤을 사용하여 데이터 가져오기
	const { isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
		'community',
		({ pageParam = page }) =>
			totalCommunityData(pageParam, filtered)
				.then((res) => {
					if (totalCommunity) {
						// 이전 페이지에 있는 기사들과 새로운 페이지에 있는 기사들을 합쳐서 업데이트합니다.
						setTotalCommunity((prevTotalCommunity) => {
							let newCommunityList = prevTotalCommunity ? [...prevTotalCommunity.communityList] : [];

							if (res.communityList && typeof res.communityList[Symbol.iterator] === 'function') {
								newCommunityList.push(...res.communityList);
							} else {
							}

							return {
								communityList: newCommunityList,
								hasNext: res.hasNext,
							};
						});
					} else {
						setTotalCommunity(res);
					}
				})
				.catch((_err) => {}),
		{
			getNextPageParam: (_lastPage) => {
				if (totalCommunity?.hasNext) {
					return page;
				}
			},
		},
	);

	// 마지막 아티클 ID를 기반으로 페이지 설정
	useEffect(() => {
		if (totalCommunity) {
			if (totalCommunity?.communityList?.length > 0) {
				const lastCommunityId = totalCommunity?.communityList[totalCommunity?.communityList?.length - 1]?.communityId;
				setPage(lastCommunityId!);
			}
		} else {
			setPage(0);
		}
	}, [totalCommunity]);

	// 스크롤 이벤트 핸들러
	useEffect(() => {
		let fetching = false;
		const handleScroll = async (e: any) => {
			const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
			if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
				fetching = true;
				if (hasNextPage) await fetchNextPage();
				fetching = false;
			}
		};
		document.addEventListener('scroll', handleScroll);
		return () => {
			document.removeEventListener('scroll', handleScroll);
		};
	}, [fetchNextPage, hasNextPage]);

	// 관찰자 설정
	const handleObserver = useCallback(
		(entries: any) => {
			const [target] = entries;
			if (target.isIntersecting) {
			}
		},
		[fetchNextPage, hasNextPage],
	);

	useEffect(() => {
		const element = observerRef.current!;
		const option = { threshold: 0 };
		const observer = new IntersectionObserver(handleObserver, option);
		observer.observe(element);
		return () => observer.unobserve(element);
	}, [fetchNextPage, hasNextPage, handleObserver]);

	const navigate = useNavigate();

	const handleCardClick = (community: CommunityList) => {
		handlehits(community.communityId!);
		navigate('/detail', { state: { community } });
	};

	const [searchType, setSearchType] = useState<string>('title');
	const [keyword, setKeyword] = useState('');
	const [category, setCategory] = useState('');
	const [participant, setParticipant] = useState<number>(0);
	const handleApplyFilter = () => {
		if (searchType != '' && keyword) {
			filtered += `${searchType}=${encodeURIComponent(keyword)}&`;
		}
		// if (ishit) {
		// 	filtered += `hit=true&`;
		// }
		if (category != '') {
			filtered += `category=${encodeURIComponent(category)}&`;
		}
		if (participant > 0) {
			filtered += `maxParticipants=${participant}&`;
		}
		// 마지막 & 제거
		filtered = filtered.slice(0, -1);
		fetchData(filtered);
	};

	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter') {
			handleApplyFilter();
		}
	};

	// 입력 값을 숫자로 바꿈
	const handleParticipantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const intValue = parseInt(e.target.value, 10);
		setParticipant(isNaN(intValue) ? 0 : intValue);
	};

	// 날짜 차이 계산 함수
	function getDaysBefore(endAt: Date): number {
		const now = new Date();
		const endDate = new Date(endAt);
		const timeDiff = endDate.getTime() - now.getTime();

		if (timeDiff < 0) {
			return 0;
		}
		const daysBefore = Math.floor(timeDiff / (1000 * 3600 * 24));

		return daysBefore;
	}

	// 날짜 형식 변경 함수
	function formatDate(date: Date): string {
		const d = new Date(date);
		const year = d.getFullYear();
		const month = (d.getMonth() + 1).toString().padStart(2, '0');
		const day = d.getDate().toString().padStart(2, '0');
		return `${year}. ${month}. ${day}`;
	}

	const categoryStyles: { [key: string]: string } = {
		비문학: 'bg-blue-200 border border-blue-500',
		정치: 'bg-gray-200 border border-gray-400 text-black',
		경제: 'bg-green-200 border border-green-400 text-black',
		사회: 'bg-yellow-100 border-yellow-400 text-black',
		'생활/문화': 'bg-purple-200 border-purple-400 text-black',
		'IT/과학': 'bg-indigo-200 border-indigo-400 text-black',
		세계: 'bg-pink-200 border-pink-400 text-black',
		오피니언: 'bg-red-200 border-red-400 text-black',
	};

	function getCategoryStyle(categoryName: string) {
		return categoryStyles[categoryName] || 'bg-gray-200 text-gray-800';
	}

	const handletop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<>
			<div className='w-full flex justify-center flex-col items-center h-full select-none'>
				<Headers />
				<div className='flex flex-col w-3/5 h-full justify-start items-center '>
					<CommunityHeader />
				</div>
				<div className='flex flex-row w-full justify-start gap-20 h-auto'>
					<div className='h-auto w-1/6 px-10'>
						<div className='w-full h-full'>
							<div className='fixed top-50'>
								<div className='flex items-start h-full flex-row'>
									<Card>
										<div className='w-full flex flex-col gap-y-5'>
											<p className='font-semibold text-md border-b-2 border-gray-200 mb-2 pb-1'>검색 필터</p>
											<div className='flex flex-col gap-4'>
												<select name='category' className='select' onChange={(e) => setCategory(e.target.value)}>
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
													onKeyDown={handleKeyPress}
												/>
												<input
													type='number'
													name='maxParticipants'
													placeholder='최대 참여자 수'
													className='input'
													onChange={handleParticipantChange}
													onKeyDown={handleKeyPress}
												/>
												{/* <div className='flex flex-row items-center gap-3'>
													<Checkbox onClick={() => setIshit((prev) => !prev)} /> <div>조회수로 정렬하기</div>
												</div> */}
											</div>

											<button
												className=' rounded-lg  text-center flex flex-row justify-center items-center text-sm h-[45px] border bg-blue-700 text-white border-blue-300 hover:bg-blue-800 '
												onClick={handleApplyFilter}
											>
												<div className='flex items-center gap-2'>
													<span className='material-symbols-outlined text-[1.2rem]'>search</span>
													<span>검색</span>
												</div>
											</button>
										</div>
									</Card>
								</div>
							</div>
						</div>
					</div>
					<div className='flex w-3/5 h-auto flex-col justify-start gap-5 '>
						{isSuccess && totalCommunity ? (
							<>
								<div className='flex flex-row w-full h-full justify-start p-3 gap-5 flex-wrap '>
									{totalCommunity.communityList?.map((community, index) => (
										<Card
											key={index}
											className='flex flex-col w-64 h-72 break-words  justify-between rounded-3xl border-gray-400 border hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'
											onClick={() => {
												handleCardClick(community);
											}}
										>
											<div className='flex flex-row justify-between text-center text-sm'>
												<div>👀 {community.hits}</div>

												<div className={`w-16 border rounded-md text-sm ${getCategoryStyle(community.categoryName)}`}>
													{community.categoryName}
												</div>
											</div>
											<div className='flex flex-col h-4/5 text-start  gap-y-2'>
												<div className='text-l border-gray-200 border-b font-bold'>
													{community.title.length <= 13 ? (
														<div>{community.title} </div>
													) : (
														<div>{community.title.slice(0, 12)}...</div>
													)}
												</div>
												<div className='text-sm'>
													{community.content.length <= 70 ? (
														<div>{community.content} </div>
													) : (
														<div>{community.content.slice(0, 70)}...</div>
													)}
												</div>
											</div>
											<div className='flex flex-col gap-2 items-end'>
												<div className='flex flex-row justify-end'>
													<div
														className={`${getDaysBefore(community.endAt!) === 0 ? 'border bg-red-200 text-red-600' : getDaysBefore(community.endAt!) < 3 ? 'bg-yellow-100' : 'bg-green-400 text-white'} rounded-md text-xs p-1 px-2`}
													>
														{getDaysBefore(community.endAt!) === 0 ? (
															<>오늘 마감</>
														) : (
															<>{getDaysBefore(community.endAt!)}일 남음</>
														)}
													</div>
												</div>
												<div className='w-full text-xs text-end'>모집 기간 ~{formatDate(community.endAt!)}</div>
											</div>
										</Card>
									))}
								</div>
							</>
						) : null}
					</div>
					<div className='fixed bottom-10 right-10 w-16 hover:cursor-pointer'>
						<img src={topbtn} alt='' onClick={handletop} />
					</div>
				</div>
				<div ref={observerRef}>
					<br />
					{totalCommunity?.communityList?.length === 0
						? '검색하려는 모집 없습니다'
						: isFetchingNextPage && hasNextPage
							? '모집을 로딩 중입니다'
							: ''}

					<br />
					<br />
				</div>
			</div>
		</>
	);
};

export default Community;
