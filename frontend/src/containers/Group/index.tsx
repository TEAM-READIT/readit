import { useLocation } from 'react-router-dom';
import Headers from '../../components/Headers';
import GroupHeader from './GroupHeader';
import { communityProps } from '../../types/gropProps';
import Articles from './Articles';
import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../../store/auth';
import { Button } from 'flowbite-react';
import { useMutation } from 'react-query';

const Group = () => {
	const { accessToken } = useAuthStore();
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const location = useLocation();
	const communityId = location.state?.communityId;
	const [myGroup, setMyGroup] = useState<communityProps>();

	// 내가 속한 모임 받아오기
	const groupData = async () => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};
		const data = await fetch(`${baseUrl}/community/${communityId}`, {
			headers: headers,
		}).then((response) => response.json());
		return data;
	};

	setTimeout(() => {
		groupData()
			.then((res) => setMyGroup(res))
			.catch((_err) => {
				console.log('내가 읽은 글 받아오는거 에러');
			});
	}, 3000);
	useEffect(() => {
		groupData()
			.then((res) => setMyGroup(res))
			.catch((_err) => {
				console.log('내가 읽은 글 받아오는거 에러');
			});
	}, []);

	const [chatValue, setChatValue] = useState<string>('채팅 보내기');

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
		console.log('채팅 보냄');
		try {
			await chatPost.mutateAsync();

			groupData()
				.then((res) => setMyGroup(res))
				.catch((_err) => {
					console.log('내가 읽은 글 받아오는거 에러');
				});
		} catch (error) {
			console.error('채팅 보내기 실패');
		}
		setChatValue('');
	};

	const chatContainerRef = useRef<HTMLDivElement>(null);

	// useEffect(() => {
	// 	if (chatContainerRef.current) {
	// 		chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
	// 	}
	// }, [myGroup?.chatList]);
	// console.log(myGroup);
	// console.log(myGroup?.chatList);

	return (
		<div className='w-full h-screen flex flex-col items-center overflow-hidden'>
			<Headers />
			<div className='flex flex-col w-3/5 h-full items-start'>
				{myGroup ? (
					<>
						<GroupHeader myGroup={myGroup} />
						<div className='w-full h-full flex flex-row gap-5 items-start p-5'>
							<Articles myGroup={myGroup} />
							<div className='w-2/5 flex flex-col gap-5 pt-3'>
								<div className='h-[530px] overflow-y-auto bg-blue-200 rounded-xl p-5' ref={chatContainerRef}>
									<div className='flex flex-col gap-5'>
										{myGroup.chatList.map((chat, index) => (
											<div key={index}>
												{chat.memberId === 1 ? (
													<div className='flex flex-row gap-x-2'>
														<img
															src={chat.memberProfile}
															alt='사용자프로필'
															className='w-12 h-12 aspect-square rounded-full'
														/>
														<div className='flex flex-col items-start'>
															<div className=''>{chat.memberName}</div>
															<div className='flex flex-row items-center gap-x-2'>
																<div className='bg-white border border-gray-500 text-xs w-full p-2 rounded-xl text-center'>
																	{chat.content}
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
																<div className='flex flex-row items-center gap-x-2'>
																	<span className='text-xs'>{new Date(chat.createdAt).toLocaleTimeString()}</span>
																	<div className='bg-yellow-200 border border-gray-500 text-xs w-full p-2 rounded-xl text-center'>
																		{chat.content}
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
										className='rounded-xl w-5/6 input'
										onChange={(e) => setChatValue(e.target.value)}
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
