import Headers from '../../components/Headers';
// import { useEffect, useState } from 'react';
// import Rank from './Rank';
import Content from './Content';
import Problems from './Problems';
import { ChallengeProps } from '../../types/challengeProps';


const Challenge = () => {
	// const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	// const [problems, setProblems] = useState<ChallengeProps>();
	// // 챌린지 문제 받아오기
	// const challengeData = async () => {
	// 	const data = await fetch(`${baseUrl}/challenge`).then((response) => response.json());
	// 	return data;
	// };

	// useEffect(() => {
	// 	challengeData()
	// 		.then((res) => setChallenge(res))
	// 		.catch((err) => {
	// 			console.log('챌린지 문제 받아오는거 에러');
	// 		});
	// }, []);
	const problems: ChallengeProps = {
		articleId: 22,
		content:
			'DNS(도메인 네임 시스템) 스푸핑은 인터넷 사용자가 어떤 사이트에 접속하려 할 때 사용자를 위조 사이트로 접속시키는 행위를 말한다. 이는 도메인 네임을 IP 주소로 변환해 주는 과 정에서 이루어진다.\n 인터넷에 연결된 컴퓨터들이 서로를 식별하고 통신하기 위 해서 각 컴퓨터들은 IP(인터넷 프로토콜)에 따라 ㉠ (만들어지는) 고유 IP 주소를 가져야 한다. 프로토콜은 컴퓨터들이 연결되어 서로 데이터를 주고받기 위해 사용하는 통신 규약으로 소프트 웨어나 하드웨어로 구현된다. 현재 주로 사용하는 IP 주소는 ‘****.126.63.1’처럼 점으로 구분된 4개의 필드에 숫자를 사용 하여 ㉡ (나타낸다.) 이 주소를 중복 지정하거나 임의로 지정해 서는 안 되고 공인 IP 주소를 부여받아야 한다.\n 공인 IP 주소에는 동일한 번호를 지속적으로 사용하는 고정 IP 주소와 번호가 변경되기도 하는 유동 IP 주소가 있다. 유동 IP 주소는 DHCP라는 프로토콜에 의해 부여된다. DHCP는 IP 주소가 필요한 컴퓨터의 요청을 받아 주소를 할당해 주고, 컴 퓨터가 IP 주소를 사용하지 않으면 주소를 반환받아 다른 컴 퓨터가 그 주소를 사용할 수 있도록 해 준다. 한편, 인터넷에 직접 접속은 안 되고 내부 네트워크에서만 서로를 식별할 수 있는 사설 IP 주소도 있다.\n 인터넷은 공인 IP 주소를 기반으로 동작하지만 우리가 인터넷을 사용할 때는 IP 주소 대신 사용하기 쉽게 ‘www..***’ 등과 같이 문자로 ㉢(이루어진) 도메인 네임을 이용한다. 따라서 도메인 네임을 IP 주소로 변환해 주는 DNS가 필요하며 DNS를 운영 하는 장치를 네임서버라고 한다. 컴퓨터에는 네임서버의 IP 주소가 기록되어 있어야 하는데, 유동 IP 주소를 할당받는 컴퓨터에는 IP 주소를 받을 때 네임서버의 IP 주소가 자동으로 기록되지만, 고정 IP 주소를 사용하는 컴퓨터에는 사용자가 네임서버의 IP 주소를 직접 기록해 놓아야 한다. 인터넷 통신사는 가입자들이 공동으로 사용할 수 있는 네임서버를 운영하고 있다.\n ㉮ (사용자가 어떤 사이트에 정상적으로 접속하는 과정)을 살 펴보자. 웹 사이트에 접속하려고 하는 컴퓨터를 클라이언트라 한다. 사용자가 방문하고자 하는 사이트의 도메인 네임을 주소 창에 직접 입력하거나 포털 사이트에서 그 사이트를 검색해 클릭하면 클라이언트는 기록되어 있는 네임서버에 도메인 네 임에 해당하는 IP 주소를 물어보는 질의 패킷을 보낸다. 네임 서버는 해당 IP 주소가 자신의 목록에 있으면 클라이언트에 이 IP 주소를 알려 주는 응답 패킷을 보낸다. 응답 패킷에는 어느 질의 패킷에 대한 응답인지가 적혀 있다. 만일 해당 IP 주소가 목록에 없으면 네임서버는 다른 네임서버의 IP 주소를 알려 주는 응답 패킷을 보내고, 클라이언트는 다시 그 네임서 버에 질의 패킷을 보내는 단계로 돌아가 같은 과정을 반복한다. 클라이언트는 이렇게 ㉣ (알아낸) IP 주소로 사이트를 찾아간다. 네임서버와 클라이언트는 UDP라는 프로토콜에 ㉤ (맞추어) 패 킷을 주고받는다. UDP는 패킷의 빠른 전송 속도를 확보하기 위해 상대에게 패킷을 보내기만 할 뿐 도착 여부는 확인하지 않으며, 특정 질의 패킷에 대해 처음 도착한 응답 패킷을 신뢰 하고 다음에 도착한 패킷은 확인하지 않고 버린다. DNS 스푸핑은 UDP의 이런 허점들을 이용한다. 이 문제지에 관한 저작권은 한국교육과정평가원에 있습니다.\n ㉯ (DNS 스푸핑이 이루어지는 과정)을 알아보자. 악성 코드에 감염되어 DNS 스푸핑을 행하는 컴퓨터를 공격자라 한다. 클 라이언트가 네임서버에 특정 IP 주소를 묻는 질의 패킷을 보 낼 때, 공격자에도 패킷이 전달되고 공격자는 위조 사이트의 IP 주소가 적힌 응답 패킷을 클라이언트에 보낸다. 공격자가 보낸 응답 패킷이 네임서버가 보낸 응답 패킷보다 클라이언트 에 먼저 도착하고 클라이언트는 공격자가 보낸 응답 패킷을 옳은 패킷으로 인식하여 위조 사이트로 연결된다.',
		problemList: [
			{
				problemNumber: 1,
				problem: '1. 윗글의 ‘프로토콜’에 대한 설명으로 적절하지 않은 것은?',
				optionList: [
					{
						optionNumber: 1,
						option: '컴퓨터 사이의 통신을 위한 규약으로서 저마다 정해진 기능이있다.',
					},
					{
						optionNumber: 2,
						option: 'IP에 따르면 현재 주로 사용하는 IP 주소는 4개의 필드에 적힌 숫자로 구성된다.',
					},
					{
						optionNumber: 3,
						option: 'DHCP를 이용하는 컴퓨터는 IP 주소를 요청해야 IP 주소를 부여받을 수 있다.',
					},
					{
						optionNumber: 4,
						option: 'DHCP를 이용하는 컴퓨터에는 네임서버의 IP 주소를 사용자가 기록해야 한다.',
					},
					{
						optionNumber: 5,
						option: 'UDP는 패킷 전송 속도를 높이기 위해 패킷이 목적지에 제대로 도착했는지 확인하지 않는다.',
					},
				],
			},
			{
				problemNumber: 2,
				problem: '2. 윗글의 ‘프로토콜’에 대한 설명으로 적절하지 않은 것은?',
				optionList: [
					{
						optionNumber: 1,
						option: '컴퓨터 사이의 통신을 위한 규약으로서 저마다 정해진 기능이있다.',
					},
					{
						optionNumber: 2,
						option: 'IP에 따르면 현재 주로 사용하는 IP 주소는 4개의 필드에 적힌 숫자로 구성된다.',
					},
					{
						optionNumber: 3,
						option: 'DHCP를 이용하는 컴퓨터는 IP 주소를 요청해야 IP 주소를 부여받을 수 있다.',
					},
					{
						optionNumber: 4,
						option: 'DHCP를 이용하는 컴퓨터에는 네임서버의 IP 주소를 사용자가 기록해야 한다.',
					},
					{
						optionNumber: 5,
						option: 'UDP는 패킷 전송 속도를 높이기 위해 패킷이 목적지에 제대로 도착했는지 확인하지 않는다.',
					},
				],
			},
		],
	};
	return (
		<>
			<div className='w-full h-screen flex flex-col items-center border overflow-hidden'>
				<Headers />
				<div className='flex flex-row w-full h-full items-start justify-center gap-10'>
					{/* <Rank /> */}
					<Content content={problems.content} />
					<Problems articleId={problems.articleId} problemList={problems.problemList} />
				</div>
			</div>
		</>
	);
};

export default Challenge;
