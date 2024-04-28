import { Breadcrumb, BreadcrumbItem, Button } from 'flowbite-react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { articleList } from '../../types/articleProps';

const EssayHeader = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const navigate = useNavigate();
	const [link, setLink] = useState<string>('');

	// 링크로 검색하기
	const requestBody = {
		link: link,
	};

	const linkPost = useMutation(async () => {
		const response = await fetch(`${baseUrl}/article/link`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		});
		return response.json();
	});
	const handleLinkData = async () => {
		try {
			const data = await linkPost.mutateAsync();
			handleLink(data);
		} catch (error) {
			console.log('링크로 기사 불러오기 실패');
		}
	};

	// 뷰어로 데이터 넘기기
	const handleLink = (data: articleList) => {
		navigate('/viewer', { state: data });
	};
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
						<h1 className='text-3xl font-semibold leading-tight text-gray-700 '>전체 글 목록</h1>
						<div className='flex h-full flex-row items-center gap-x-2 w-3/4 justify-center'>
							<input
								type='text'
								name='keyword'
								placeholder='링크로 검색하기'
								className='input w-full h-full'
								onChange={(e) => setLink(e.target.value)}
							/>
							<span className='material-symbols-outlined hover:cursor-pointer' onClick={handleLinkData}>
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
