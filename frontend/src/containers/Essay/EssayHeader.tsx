import { Breadcrumb, BreadcrumbItem } from 'flowbite-react';
import { 
	useEffect,
	 useState } from 'react';
import { Link, 
	useNavigate
 } from 'react-router-dom';
import { articleList } from '../../types/articleProps';

const EssayHeader = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const navigate = useNavigate();
	const [link, setLink] = useState<string>('');
	const [linkdata, setLinkData] = useState<articleList>();
	// 링크로 검색하기

	const fetchlinkData = async () => {
		const data = await fetch(`${baseUrl}/article/link?url=${link}`).then((response) => response.json());
		console.log(data);
		return data;
	};

	// 뷰어로 데이터 넘기기
	const handleLink = () => {
		fetchlinkData()
			.then((res) => {
				setLinkData(res)
				
			})
			.catch((_err) => {
				console.log('챌린지 문제 받아오는거 에러');
			});
	};

	useEffect(()=>{
		if(linkdata?.id){

			navigate('/viewer', { state: { linkdata } });
		}
	},[linkdata?.id])


	return (
		<>
			<div className='flex flex-row w-full justify-between px-5 pb-10 items-center'>
				<div className=' w-full'>
					<Breadcrumb className='pb-8'>
						<BreadcrumbItem>
							<Link to='/'>홈</Link>
						</BreadcrumbItem>
						<BreadcrumbItem>
							<div className='hover:cursor-pointer'>글</div>
						</BreadcrumbItem>
					</Breadcrumb>
					<div className='flex flex-row justify-between items-center w-full py-0.5'>
						<h1 className='text-2xl font-semibold leading-tight text-gray-700 '>전체 글 목록</h1>
						<div className='flex h-full flex-row items-center gap-x-2 w-3/4 justify-center'>
							<input
								type='text'
								name='keyword'
								placeholder='링크로 READIT 시작하기!'
								className='input w-full h-full'
								onChange={(e) => setLink(e.target.value)}
							/>
							<span
								className='material-symbols-outlined hover:cursor-pointer'
								onClick={() => {
									handleLink();
								}}
							>
								search
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EssayHeader;
