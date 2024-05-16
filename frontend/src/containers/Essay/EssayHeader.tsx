import { Breadcrumb, BreadcrumbItem, Button, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { articleList } from '../../types/articleProps';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useAuthStore } from '../../store/auth';
import useModal from '../../hooks/useModal';
import Login from '../MainPage/Login/Login';

const EssayHeader = () => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const navigate = useNavigate();
	const [isOpen, open, close] = useModal();
	const { accessToken } = useAuthStore();
	const [link, setLink] = useState<string>('');
	const [linkdata, setLinkData] = useState<articleList>();
	// 링크로 검색하기
	const [modalOpen, setModalOpen] = useState(false);

	const fetchlinkData = async () => {
		const data = await fetch(`${baseUrl}/article/link?url=${link}`).then((response) => response.json());
		return data;
	};

	// 뷰어로 데이터 넘기기
	const handleLink = () => {
		fetchlinkData()
			.then((res) => {
				if (res.status === 404) {
					setModalOpen(true);
				} else {
					setLinkData(res);
				}
			})
			.catch((_err) => {});
	};

	useEffect(() => {
		if (linkdata?.id) {
			navigate('/viewer', { state: { linkdata } });
		}
	}, [linkdata?.id]);

	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter') {
			if (accessToken) {
				handleLink();
			} else {
				open();
			}
		} 
	};
	return (
		<>
			<Modal show={modalOpen} size='md' onClose={() => setModalOpen(false)}>
				<Modal.Header />
				<Modal.Body>
					<div className='text-center'>
						<HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
						<h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>존재하지 않는 기사입니다.</h3>
						<div className='flex justify-center gap-4'>
							<Button color='failure' onClick={() => setModalOpen(false)}>
								확인
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
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
						<div className='flex h-full flex-row items-center gap-x-2 w-5/6 justify-center'>
							<input
								type='text'
								name='keyword'
								placeholder='읽고 싶은 네이버 뉴스 기사의 링크를 입력하면 뷰어로 읽을 수 있어요!'
								className='input w-full h-full'
								onChange={(e) => setLink(e.target.value)}
								onKeyDown={handleKeyPress}
							/>
							<span
								className='material-symbols-outlined hover:cursor-pointer'
								onClick={() => {
									{
										accessToken ? handleLink() : open();
									}
								}}
							>
								search
							</span>
						</div>
					</div>
				</div>
			</div>
			{isOpen ? <Login close={close} /> : null}
		</>
	);
};

export default EssayHeader;
