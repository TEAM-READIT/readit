import { useLocation } from 'react-router-dom';
import Headers from '../../components/Headers';
import GroupHeader from './GroupHeader';
import { communityProps } from '../../types/gropProps';
import Articles from './Articles';
import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../../store/auth';
import { Button } from 'flowbite-react';
import { useMutation } from 'react-query';
import clap from '../../assets/images/박수.gif';
import sakura from '../../assets/images/sakura.gif';
import xx from '../../assets/images/ㅌㅌ.gif';
const Group = () => {
	const { accessToken } = useAuthStore();

	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const location = useLocation();
	const community = location.state?.community;
	const [myGroup, setMyGroup] = useState<communityProps>();
	const [noticebody, setnoticebody] = useState<string>('');
	// 내가 속한 모임 받아오기
	const groupData = async () => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};
		const data = await fetch(`${baseUrl}/community/${community.communityId}`, {
			headers: headers,
		}).then((response) => response.json());
		return data;
	};

	// 처음에 받아오고
	useEffect(() => {
		groupData()
			.then((res) => {
				setMyGroup(res);
			})
			.catch((_err) => {});
	}, []);

	const [chatValue, setChatValue] = useState<string>('');
	// 채팅 보내기
	const chatBody = {
		communityId: myGroup?.communityDetail.communityId,
		content: chatValue,
	};
	const chatPost = useMutation(async () => {
		await fetch(`${baseUrl}/community/chat`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(chatBody),
		});
	});
	const handleSendingChat = async () => {
		try {
			if (!chatValue.trim()) {
				// 빈 값이면 전송하지 않음
				return;
			}
			if (chatValue.startsWith('/공지')) {
				setnoticebody(chatValue.substring(4));
				setChatValue('');
				return;
			}
			if (chatContainerRef.current) {
				chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
			}
			await chatPost.mutateAsync();

			groupData()
				.then((res) => setMyGroup(res))
				.catch((_err) => {});
		} catch (error) {}
		setChatValue('');
	};
	const [isScrolling, setIsScrolling] = useState(false);
	const scrollTimeout = useRef<number | null>(null);

	useEffect(() => {
		const handleScrollStart = () => {
			setIsScrolling(true);
			// 스크롤이 멈추면 1초 후에 isScrolling을 false로 설정합니다.
			if (scrollTimeout.current !== null) {
				clearTimeout(scrollTimeout.current);
			}
			scrollTimeout.current = setTimeout(() => {
				setIsScrolling(false);
			}, 1000);
		};

		const handleScrollEnd = () => {
			// 스크롤 종료 시 이벤트 핸들러를 호출하지 않고 isScrolling을 false로 설정합니다.
			setIsScrolling(false);
			if (scrollTimeout.current !== null) {
				clearTimeout(scrollTimeout.current);
			}
		};

		// scroll 이벤트 리스너를 추가합니다.
		window.addEventListener('scroll', handleScrollStart);
		window.addEventListener('scroll', handleScrollEnd);

		return () => {
			// 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
			window.removeEventListener('scroll', handleScrollStart);
			window.removeEventListener('scroll', handleScrollEnd);
			if (scrollTimeout.current !== null) {
				clearTimeout(scrollTimeout.current);
			}
		};
	}, []);

	const handleKeyPress = (e: any) => {
		// 입력 필드에서 엔터 키가 눌렸을 때
		if (e.key === 'Enter') {
			handleSendingChat();
			// 입력 필드 초기화
			setChatValue('');
		}
	};

	useEffect(() => {
		handlenoticePost();
	}, [noticebody]);
	const noticePost = useMutation(async () => {
		await fetch(`${baseUrl}/community/notice/${myGroup?.communityDetail.communityId}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: noticebody,
		});
	});
	const handlenoticePost = async () => {
		try {
			await noticePost.mutateAsync();
			groupData()
				.then((res) => setMyGroup(res))
				.catch((_err) => {});
		} catch (error) {}
	};

	const chatContainerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (!isScrolling) {
			if (chatContainerRef.current) {
				chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
			}
		}
	}, [myGroup?.chatList.length]);
	// const [a, setA] = useState<number>(1);
	// setTimeout(() => {
	// 	setA((prev) => prev * -1);
	// }, 100);
	// useEffect(() => {
	// 	groupData()
	// 		.then((res) => setMyGroup(res))
	// 		.catch((_err) => {});
	// }, [a]);
	return (
		<div className='w-full h-screen flex flex-col items-center overflow-hidden'>
			<Headers />
			<div className='flex flex-col w-3/5 h-full items-start'>
				{myGroup ? (
					<>
						<GroupHeader
							myGroup={myGroup}
							setnoticebody={setnoticebody}
							handlenoticePost={handlenoticePost}
							noticebody={noticebody}
						/>
						<div className='w-full h-full flex flex-row gap-5 items-start p-5'>
							<Articles myGroup={myGroup} />
							<div className='w-2/5 flex flex-col gap-5 pt-3'>
								<div className='h-[530px] overflow-y-auto bg-blue-200 rounded-xl p-5 relative' ref={chatContainerRef}>
									<div className='flex flex-col gap-5'>
										{myGroup.chatList.map((chat, index) => (
											<div key={index}>
												{chat.memberId !== myGroup.myId ? (
													<div className='flex flex-row gap-x-2'>
														<img
															src={chat.memberProfile}
															alt='사용자프로필'
															className='w-12 h-12 aspect-square rounded-full'
														/>
														<div className='flex flex-col items-start'>
															<div className=''>{chat.memberName}</div>
															<div className='flex flex-row items-end gap-x-2'>
																<div className='bg-white border border-gray-500 text-xs px-3 p-2 rounded-lg text-start break-words whitespace-pre-wrap max-w-[150px]'>
																	{chat.content === '/박수' ? (
																		<>
																			<img src={clap} alt='걸렷네'></img>
																		</>
																	) : chat.content === '/고양이' ? (
																		<>
																			<img src={sakura} alt='걸렷네'></img>
																		</>
																	) : chat.content === '/ㅌㅌ' ? (
																		<>
																			<img src={xx} alt='걸렷네'></img>
																		</>
																	) : (
																		<>{chat.content}</>
																	)}
																</div>
																<span className='text-xs'>{new Date(chat.createdAt).toLocaleTimeString()}</span>
															</div>
														</div>
													</div>
												) : (
													<>
														<div className='flex flex-row gap-x-2 justify-end'>
															<div className='flex flex-col items-end'>
																<div className=''>{chat.memberName}</div>
																<div className='flex flex-row items-end gap-x-2'>
																	<span className='text-xs'>{new Date(chat.createdAt).toLocaleTimeString()}</span>
																	<div className='bg-yellow-200 border border-gray-500 text-xs px-3 p-2 rounded-lg text-start break-words whitespace-pre-wrap max-w-[150px]'>
																		{chat.content === '/박수' ? (
																			<>
																				<img src={clap} alt='걸렷네'></img>
																			</>
																		) : chat.content === '/고양이' ? (
																			<>
																				<img src={sakura} alt='걸렷네'></img>
																			</>
																		) : chat.content === '/ㅌㅌ' ? (
																			<>
																				<img src={xx} alt='걸렷네'></img>
																			</>
																		) : (
																			<>{chat.content}</>
																		)}
																	</div>
																</div>
															</div>
															<img
																src={chat.memberProfile}
																alt='사용자프로필'
																className='w-12 h-12 aspect-square rounded-full'
															/>
														</div>
													</>
												)}
											</div>
										))}
									</div>
								</div>
								<div className='flex flex-row h-full w-full items-center gap-5'>
									<input
										type='text'
										name='chat'
										placeholder='메시지를 입력하세요'
										value={chatValue}
										className='rounded-xl w-5/6 input'
										onChange={(e) => setChatValue(e.target.value)}
										onKeyDown={handleKeyPress}
									/>
									<Button
										className='border w-1/6 bg-blue-700 text-white border-blue-300 hover:bg-blue-800'
										onClick={handleSendingChat}
									>
										전송
									</Button>
								</div>
							</div>
						</div>
					</>
				) : null}
			</div>
		</div>
	);
};
export default Group;
