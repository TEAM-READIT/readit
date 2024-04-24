import { Card } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Article {
	articleId: number;
	title: string;
	type: string;
	content: string;
	categoryName: string;
	hits: number;
}

const PopCards = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const navigate = useNavigate();
	const handleCardClick = (article: Article) => {
		console.log(article);
		navigate('/text', { state: { article } });
	};
	// const [popArticleData, setPopArticleData] = useState<Article[]>([]);
	// 인기있는 아티클 받아오기
	// const fetchPopArticle = async () => {
	// 	const response = await fetch(`${baseUrl}/article`);
	// 	const data = await response.json();
	// 	setPopArticleData(data);
	// };

	// useEffect(() => {
	// 	fetchPopArticle();
	// }, []);

	const total = 0b0;
	const news = 0b1;
	const liter = 0b10;

	const [mode, setMode] = useState(total);

	const popArticleData: Article[] = [
		{
			articleId: 1,
			title: '문법',
			content:
				'두 명제가 모두 참인 것도 모두 거짓인 것도 가능하지 않은 관계를 모순 관계라고 한다. 예를 들어, 임의의 명제를 P라고 하면 P와 ～P는 모순 관계이다.(기호 ‘～’은 부정을 나타낸다.) P와 ～P가 모두 참인 것은 가능하지 않다는 법칙을 무모순율 이라고 한다. 그런데 “㉠(다보탑은 경주에 있다.)”와 “㉡(다보탑은 개성에 있을 수도 있었다.)”는 모순 관계가 아니다. 현실과 다르게 다보탑을 경주가 아닌 곳에 세웠다면 다보탑의 소재지는 지 금과 달라졌을 것이다. 철학자들은 이를 두고, P와 ～P가 모두 참인 혹은 모두 거짓인 가능세계는 없지만 다보탑이 개성에 있는 가능세계는 있다고 표현한다. \n ‘가능세계’의 개념은 일상 언어에서 흔히 쓰이는 필연성과 가능 성에 관한 진술을 분석하는 데 중요한 역할을 한다. ‘P는 가능 하다’는 P가 적어도 하나의 가능세계에서 성립한다는 뜻이며, ‘P는 필연적이다’는 P가 모든 가능세계에서 성립한다는 뜻이다. “만약 Q이면 Q이다.”를 비롯한 필연적인 명제들은 모든 가능 세계에서 성립한다. “다보탑은 경주에 있다.”와 같이 가능하지만 필연적이지는 않은 명제는 우리의 현실세계를 비롯한 어떤 가능 세계에서는 성립하고 또 어떤 가능세계에서는 성립하지 않는다.\n 가능세계를 통한 담론은 우리의 일상적인 몇몇 표현들을 보다 잘 이해하는 데 도움이 된다. 다음 상황을 생각해 보자. 나는 현실에서 아침 8시에 출발하는 기차를 놓쳤고, 지각을 했으며, 내가 놓친 기차는 제시간에 목적지에 도착했다. 그리고 나는 “만약 내가 8시 기차를 탔다면, 나는 지각을 하지 않았다.”라고 주장한다. 그런데 전통 논리학에서는 “만약 A이면 B이다.”라는 형식의 명제는 A가 거짓인 경우에는 B의 참 거짓에 상관없이 참이라고 규정한다. 그럼에도 ⓐ (내가 만약 그 기차를 탔다면 여전히 지각을 했을 것이라고 주장하지는 않는 이유는 무엇일 까?) 내가 그 기차를 탄 가능세계들을 생각해 보면 그 이유를 알 수 있다. 그 가능세계 중 어떤 세계에서 나는 여전히 지각 을 한다. 가령 내가 탄 그 기차가 고장으로 선로에 멈춰 운행이 오랫동안 지연된 세계가 그런 예이다. 하지만 내가 기차를 탄 세계들 중에서, 내가 기차를 타고 별다른 이변 없이 제시간에 도착한 세계가 그렇지 않은 세계보다 우리의 현실세계와의 유 사성이 더 높다. 일반적으로, A가 참인 가능세계들 중에 비교 할 때, B도 참인 가능세계가 B가 거짓인 가능세계보다 현실세 계와 더 유사하다면, 현실세계의 나는 A가 실현되지 않은 경우 에, 만약 A라면 ～B가 아닌 B이라고 말할 수 있다.\n 가능세계는 다음의 네 가지 성질을 갖는다. 첫째는 가능세계의 일관성이다. 가능세계는 명칭 그대로 가능한 세계이므로 어떤 것이 가능하지 않다면 그것이 성립하는 가능세계는 없다. 둘째는 가능세계의 포괄성이다. 이것은 어떤 것이 가능하다면 그것이 성립하는 가능세계는 존재한다는 것이다. 셋째는 가능세계의 완결성이다. 어느 세계에서든 임의의 명제 P에 대해 “P이거나 ～P이다.”라는 배중률이 성립한다. 즉 P와 ～P 중 하나는 반드 시 참이라는 것이다. 넷째는 가능세계의 독립성이다. 한 가능세 계는 모든 시간과 공간을 포함해야만 하며, 연속된 시간과 공간 에 포함된 존재들은 모두 동일한 하나의 세계에만 속한다. 이 문제지에 관한 저작권은 한국교육과정평가원에 있습니다. 한 가능세계 W1의 시간과 공간이, 다른 가능세계 W2의 시간과 공간으로 이어질 수는 없다. W1과 W2는 서로 시간과 공간이 전혀 다른 세계이다.\n 가능세계의 개념은 철학에서 갖가지 흥미로운 질문과 통찰을 이끌어 내며, 그에 관한 연구 역시 활발히 진행되고 있다. 나아가 가능세계를 활용한 논의는 오늘날 인지 과학, 언어학, 공학 등의 분야로 그 응용의 폭을 넓히고 있다다.',

			type: '비문학',
			categoryName: '시사',
			hits: 526,
		},
		{
			articleId: 1,
			title: 'DNS 스푸핑이 이루어지는 과정',
			content:
				'DNS(도메인 네임 시스템) 스푸핑은 인터넷 사용자가 어떤 사이트에 접속하려 할 때 사용자를 위조 사이트로 접속시키는 행위를 말한다. 이는 도메인 네임을 IP 주소로 변환해 주는 과 정에서 이루어진다. 인터넷에 연결된 컴퓨터들이 서로를 식별하고 통신하기 위 해서 각 컴퓨터들은 IP(인터넷 프로토콜)에 따라 ㉠ (만들어지는) 고유 IP 주소를 가져야 한다. 프로토콜은 컴퓨터들이 연결되어 서로 데이터를 주고받기 위해 사용하는 통신 규약으로 소프트 웨어나 하드웨어로 구현된다. 현재 주로 사용하는 IP 주소는 ‘.126.63.1’처럼 점으로 구분된 4개의 필드에 숫자를 사용 하여 ㉡ (나타낸다.) 이 주소를 중복 지정하거나 임의로 지정해 서는 안 되고 공인 IP 주소를 부여받아야 한다. 공인 IP 주소에는 동일한 번호를 지속적으로 사용하는 고정 IP 주소와 번호가 변경되기도 하는 유동 IP 주소가 있다. 유동 IP 주소는 DHCP라는 프로토콜에 의해 부여된다. DHCP는 IP 주소가 필요한 컴퓨터의 요청을 받아 주소를 할당해 주고, 컴 퓨터가 IP 주소를 사용하지 않으면 주소를 반환받아 다른 컴 퓨터가 그 주소를 사용할 수 있도록 해 준다. 한편, 인터넷에 직접 접속은 안 되고 내부 네트워크에서만 서로를 식별할 수 있는 사설 IP 주소도 있다. 인터넷은 공인 IP 주소를 기반으로 동작하지만 우리가 인터넷을 사용할 때는 IP 주소 대신 사용하기 쉽게 ‘www..***’ 등과 같이 문자로 ㉢(이루어진) 도메인 네임을 이용한다. 따라서 도메인 네임을 IP 주소로 변환해 주는 DNS가 필요하며 DNS를 운영 하는 장치를 네임서버라고 한다. 컴퓨터에는 네임서버의 IP 주소가 기록되어 있어야 하는데, 유동 IP 주소를 할당받는 컴퓨터에는 IP 주소를 받을 때 네임서버의 IP 주소가 자동으로 기록되지만, 고정 IP 주소를 사용하는 컴퓨터에는 사용자가 네임서버의 IP 주소를 직접 기록해 놓아야 한다. 인터넷 통신사는 가입자들이 공동으로 사용할 수 있는 네임서버를 운영하고 있다. ㉮ (사용자가 어떤 사이트에 정상적으로 접속하는 과정)을 살 펴보자. 웹 사이트에 접속하려고 하는 컴퓨터를 클라이언트라 한다. 사용자가 방문하고자 하는 사이트의 도메인 네임을 주소 창에 직접 입력하거나 포털 사이트에서 그 사이트를 검색해 클릭하면 클라이언트는 기록되어 있는 네임서버에 도메인 네 임에 해당하는 IP 주소를 물어보는 질의 패킷을 보낸다. 네임 서버는 해당 IP 주소가 자신의 목록에 있으면 클라이언트에 이 IP 주소를 알려 주는 응답 패킷을 보낸다. 응답 패킷에는 어느 질의 패킷에 대한 응답인지가 적혀 있다. 만일 해당 IP 주소가 목록에 없으면 네임서버는 다른 네임서버의 IP 주소를 알려 주는 응답 패킷을 보내고, 클라이언트는 다시 그 네임서 버에 질의 패킷을 보내는 단계로 돌아가 같은 과정을 반복한다. 클라이언트는 이렇게 ㉣ (알아낸) IP 주소로 사이트를 찾아간다. 네임서버와 클라이언트는 UDP라는 프로토콜에 ㉤ (맞추어) 패 킷을 주고받는다. UDP는 패킷의 빠른 전송 속도를 확보하기 위해 상대에게 패킷을 보내기만 할 뿐 도착 여부는 확인하지 않으며, 특정 질의 패킷에 대해 처음 도착한 응답 패킷을 신뢰 하고 다음에 도착한 패킷은 확인하지 않고 버린다. DNS 스푸 핑은 UDP의 이런 허점들을 이용한다. 이 문제지에 관한 저작권은 한국교육과정평가원에 있습니다. ㉯ (DNS 스푸핑이 이루어지는 과정)을 알아보자. 악성 코드에 감염되어 DNS 스푸핑을 행하는 컴퓨터를 공격자라 한다. 클 라이언트가 네임서버에 특정 IP 주소를 묻는 질의 패킷을 보 낼 때, 공격자에도 패킷이 전달되고 공격자는 위조 사이트의 IP 주소가 적힌 응답 패킷을 클라이언트에 보낸다. 공격자가 보낸 응답 패킷이 네임서버가 보낸 응답 패킷보다 클라이언트 에 먼저 도착하고 클라이언트는 공격자가 보낸 응답 패킷을 옳은 패킷으로 인식하여 위조 사이트로 연결된다.',
			type: '뉴스',
			categoryName: '시사',
			hits: 543,
		},
		{
			articleId: 1,
			title: 'AXYZ에서 Flutter 앱 개발자, React웹 개발자 한분 씩을 모집합니다 가나다',
			content: '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
			type: '뉴스',
			categoryName: '시사',
			hits: 523,
		},
		{
			articleId: 1,
			title: 'AXYZ에서 Flutter 앱 개발자, React웹 개발자 한분 씩을 모집합니다 가나다',
			content: '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
			type: '뉴스',
			categoryName: '시사',
			hits: 623,
		},
		{
			articleId: 1,
			title: 'AXYZ에서 Flutter 앱 개발자, React웹 개발자 한분 씩을 모집합니다 가나다',
			content: '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
			type: '뉴스',
			categoryName: '시사',
			hits: 723,
		},
	];

	return (
		<>
			<div className='flex flex-col w-full items-center'>
				<div className='flex flex-row w-full h-28 items-center text-gray-400 font-bold text-2xl text-end gap-x-16'>
					{mode == total ? (
						<div className='text-black'>
							<div onClick={() => setMode(total)}>🔥 이번 주 리딧 인기글</div>
						</div>
					) : (
						<div onClick={() => setMode(total)}>🔥 이번 주 리딧 인기글</div>
					)}
					{mode == news ? (
						<div className='text-black'>
							<div onClick={() => setMode(news)}> 뉴스 </div>
						</div>
					) : (
						<div onClick={() => setMode(news)}> 뉴스 </div>
					)}
					{mode == liter ? (
						<div className='text-black'>
							<div onClick={() => setMode(liter)}> 비문학 </div>
						</div>
					) : (
						<div onClick={() => setMode(liter)}> 비문학 </div>
					)}
				</div>
				<div className='flex flex-row w-full h-52 justify-start px-3 gap-x-5 flex-wrap'>
					{mode == total ? (
						<>
							{popArticleData.map((article, index) => (
								<Card
									key={index}
									className='flex flex-col w-64 justify-between rounded-3xl border-gray-400 border'
									onClick={() => handleCardClick(article)}
								>
									<div className='flex justify-end gap-2'>
										<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
											#{article.type}
										</div>
										<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
											#{article.categoryName}
										</div>
									</div>
									{/* <div className='text-start text-gray-400 text-sm'>마감일 | 2024.04.21</div> */}
									<div className='h-4/5 text-start font-bold py-2'>
										{article.title.length <= 35 ? (
											<div>{article.title} </div>
										) : (
											<div>{article.title.slice(0, 35)}...</div>
										)}
									</div>
									<div className='text-end text-sm'>👀 조회수 {article.hits}</div>
								</Card>
							))}
						</>
					) : mode == news ? (
						<>
							{popArticleData
								.filter((article) => article.type === '뉴스')
								.map((article, index) => (
									<Card
										key={index}
										className='flex flex-col w-64 justify-between rounded-3xl border-gray-400 border'
										onClick={() => handleCardClick(article)}
									>
										<div className='flex justify-end gap-2'>
											<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
												#{article.type}
											</div>
											<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
												#{article.categoryName}
											</div>
										</div>
										{/* <div className='text-start text-gray-400 text-sm'>마감일 | 2024.04.21</div> */}
										<div className='h-4/5 text-start font-bold py-2'>
											{article.title.length <= 35 ? (
												<div>{article.title} </div>
											) : (
												<div>{article.title.slice(0, 35)}...</div>
											)}
										</div>
										<div className='text-end text-sm'>👀 조회수 {article.hits}</div>
									</Card>
								))}
						</>
					) : (
						<>
							{popArticleData
								.filter((article) => article.type === '비문학')
								.map((article, index) => (
									<Card
										key={index}
										className='flex flex-col w-64 justify-between rounded-3xl border-gray-400 border'
										onClick={() => handleCardClick(article)}
									>
										<div className='flex justify-end gap-2'>
											<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
												#{article.type}
											</div>
											<div className='w-16 border border-tag-100 bg-tag-50 rounded-xl text-tag-100 text-sm'>
												#{article.categoryName}
											</div>
										</div>
										{/* <div className='text-start text-gray-400 text-sm'>마감일 | 2024.04.21</div> */}
										<div className='h-4/5 text-start font-bold py-2'>
											{article.title.length <= 35 ? (
												<div>{article.title} </div>
											) : (
												<div>{article.title.slice(0, 35)}...</div>
											)}
										</div>
										<div className='text-end text-sm'>👀 조회수 {article.hits}</div>
									</Card>
								))}
						</>
					)}
				</div>
			</div>
		</>
	);
};
export default PopCards;
