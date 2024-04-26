import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Headers from '../../components/Headers';
import RightArrow from '../../assets/images/right-arrow.png';
import LeftArrow from '../../assets/images/left-arrow.png';
import UpArrow from '../../assets/images/up-arrow.png';
import DownArrow from '../../assets/images/down-arrow.png';
import { DictionarySearch } from './Dictionary/DictionarySearch';
import { SearchWord } from './Dictionary/SearchWord';
import { TextBox } from './Summary/TextBox';
import { Memos } from './Memo/Memos';
import { Button } from 'flowbite-react';

export const ViewerPage = () => {
	const location = useLocation();
	const article = location.state?.article;
	const [isRightOpen, setRightOpen] = useState(true);
	const [isBottomOpen, setBottomOpen] = useState(true);

	// 오른쪽 슬라이드 상태 값
	const toggleRight = () => {
		setRightOpen(!isRightOpen);
	};

	// 하단 슬라이드 상태 값
	const toggleBottom = () => {
		setBottomOpen(!isBottomOpen);
	};

	return (
		<>
			<div className='w-full flex justify-center flex-col items-center'>
				<Headers />
				<div className='relative flex'>
					<div
						className={`relative flex flex-col w-${isRightOpen ? '4/5' : 'full'} h-screen transition-all duration-300 ease-in-out`}
					>
						<div
							className={`relative flex w-full h-${isBottomOpen ? '2/3' : 'full'} transition-all duration-300 ease-in-out`}
						>
							<div className='relative flex flex-col w-1/5 h-full'>
								<div className='w-full h-5/6 bg-yellow-100 p-[1vw]'>
									<div className='w-full h-full bg-white'>
										<DictionarySearch />
										<SearchWord />
									</div>
								</div>
								<div className='w-full h-1/6 bg-red-400'></div>
							</div>
							<div className='w-4/5 h-full bg-green-500 px-[5%] pt-[3%] pb-[5%]'>
								<div className='w-full h-full bg-white overflow-y-auto'>
									<div>{article.title}</div>
									{article.content}
								</div>
							</div>
						</div>
						<div
							className={`relative flex flex-col transition-all duration-300 ease-in-out ${isBottomOpen ? 'h-1/3' : 'h-1/12'}`}
						>
							<div className='w-full h-1/12 flex justify-center bg-primary-100' onClick={toggleBottom}>
								<img src={isBottomOpen ? DownArrow : UpArrow} />
							</div>
							<div
								className={`w-full h-full p-[1vw] bg-yellow-500 transition-all duration-300 ease-in-out ${isBottomOpen ? 'block' : 'hidden'}`}
							>
								<TextBox />
							</div>
						</div>
					</div>
					<div
						className={`relative flex h-screen transition-all duration-300 ease-in-out ${isRightOpen ? 'w-1/5' : 'w-1/24'}`}
					>
						<div className='h-screen bg-white flex items-center' onClick={toggleRight}>
							<img src={isRightOpen ? RightArrow : LeftArrow} />
						</div>
						<div
							className={`w-11/12 h-full bg-gray-300 transition-all duration-300 ease-in-out ${isRightOpen ? 'block' : 'hidden'}`}
						>
							<div className='w-full h-4/5 overflow-y-auto'>
								<Memos />
							</div>
							<div className='flex flex-col items-center w-full h-1/5'>
								<div className='m-[10%]'>
									<Button className='border bg-blue-700 text-white border-blue-300 hover:bg-blue-800'>
										<div className='flex items-center gap-2'>
											<span>임시 저장</span>
										</div>
									</Button>
								</div>
								<div className='mx-[10%]'>
									<Button className='border bg-blue-700 text-white border-blue-300 hover:bg-blue-800'>
										<div className='flex items-center gap-2'>
											<span>제출</span>
										</div>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
