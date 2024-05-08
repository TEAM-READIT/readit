import { Button } from "flowbite-react";
import { communityProps } from "../../types/gropProps";
import ProfileImage from '../../assets/images/profile.png'
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useAuthStore } from "../../store/auth";

const Chat = ({ myGroup }: { myGroup: communityProps }) => {
	const { accessToken } = useAuthStore();
	const [chatValue, setChatValue] = useState<string>('채팅 보내기');
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;

	// 채팅 보내기
		const chatBody = {
			communityId: myGroup.communityDetail.communityId,
			content: chatValue,
	}
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
			await chatPost.mutateAsync();
				
		} catch (error) {
			console.error('채팅 보내기 실패');
		}
	};


	// useEffect(() => {
	// 	handleSendingChat();
	// },[handleSendingChat])


	const chatContainerRef = useRef<HTMLDivElement>(null);


	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [myGroup.chatList]);

	return (
		<>
			<div className='w-2/5 flex flex-col gap-5 pt-3'>
				<div className='h-[530px] overflow-y-auto bg-blue-200 rounded-xl p-5' ref={chatContainerRef}>
					<div className='flex flex-col gap-5'>
						{myGroup.chatList.map((chat, index) => (
							<div key={index}>
								{chat.memberId === 1 ? (
									<div className='flex flex-row gap-x-2'>
										<img src={ProfileImage} alt='사용자프로필' className='w-12 h-12 aspect-square' />
										<div className='flex flex-col items-start'>
											<div className=''>{chat.memberName}</div>
											<div className='flex flex-row items-center gap-x-2'>
												<div className='bg-white border border-gray-500 text-xs w-full p-2 rounded-xl text-start'>
													{chat.content}
												</div>
												<span className='text-xs'>
													{chat.createdAt.getHours()}:{chat.createdAt.getMinutes() < 10 ? '0' : ''}
													{chat.createdAt.getMinutes()}
												</span>
											</div>
										</div>
									</div>
								) : (
									<>
										<div className='flex flex-row gap-x-2 justify-end'>
											<div className='flex flex-col items-end'>
												<div className=''>{chat.memberName}</div>
												<div className='flex flex-row items-center gap-x-2'>
													<span className='text-xs'>
														{chat.createdAt.getHours()}:{chat.createdAt.getMinutes() < 10 ? '0' : ''}
														{chat.createdAt.getMinutes()}
													</span>
													<div className='bg-yellow-200 border border-gray-500 text-xs w-full p-2 rounded-xl text-start'>
														{chat.content}
													</div>
												</div>
											</div>
											<img src={ProfileImage} alt='사용자프로필' className='w-12 h-12 aspect-auto' />
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
		</>
	);
};

export default Chat