interface MemoList {
	color: string;
	content: string;
	startIndex: number;
	endIndex: number;
}

export const Memos = () => {
	const MemoData: MemoList[] = [
		{
			color: '#ffffff',
			content: '유동 IP 주소는 DHCP라는 프로토콜에 의해 부여된다.',
			startIndex: 1,
			endIndex: 2,
		},
		{
			color: '#ffffff',
			content: 'DNS(도메인 네임 시스템) 스푸핑은 인터넷 사용자가 어떤 사이트에 접속하려 할 때 사용자를 위조 사이트로 접속시키는 행위를 말한다.',
			startIndex: 1,
			endIndex: 2,
		},
		{
			color: '#ffffff',
			content: '클라이언트가 네임서버에 특정 IP 주소를 묻는 질의 패킷을 보 낼 때, 공격자에도 패킷이 전달되고 공격자는 위조 사이트의 IP 주소가 적힌 응답 패킷을 클라이언트에 보낸다.',
			startIndex: 1,
			endIndex: 2,
		},
		{
			color: '#ffffff',
			content: '공격자가 보낸 응답 패킷이 네임서버가 보낸 응답 패킷보다 클라이언트 에 먼저 도착하고 클라이언트는 공격자가 보낸 응답 패킷을 옳은 패킷으로 인식하여 위조 사이트로 연결된다.',
			startIndex: 1,
			endIndex: 2,
		},
	];

	return (
		<>
        {MemoData.map((myMemo, index) => (
            <div key={index} className='w-[80%] h-auto py-[4%] px-[7%] mx-[10%] mt-[15%] bg-yellow-200 shadow-md'>
                <div className="p-[5%]">{myMemo.content}</div>
            </div>
        ))}
		</>
	);
};
