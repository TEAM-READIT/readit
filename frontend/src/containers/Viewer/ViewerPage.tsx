import { useState } from 'react';
import Headers from '../../components/Headers';
import RightArrow from '../../assets/images/right-arrow.png';
import LeftArrow from '../../assets/images/left-arrow.png';
import UpArrow from '../../assets/images/up-arrow.png';
import DownArrow from '../../assets/images/down-arrow.png';
import Pencil from '../../assets/images/pencil.png';
import Highlight from '../../assets/images/highlight.png';
import Eraser from '../../assets/images/eraser.png';
import { DictionarySearch } from './DictionarySearch';
import { TextBox } from './Summary/TextBox';
import { Memos } from './Memo/Memos';
import { Button } from 'flowbite-react';
import { MainText } from './TextArea/MainText';
import { useLocation } from 'react-router-dom';

export const ViewerPage = () => {
	const [isRightOpen, setRightOpen] = useState(true);
	const [isBottomOpen, setBottomOpen] = useState(true);
	const location = useLocation();
	const communityId = location.state?.communityId;

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
								<div className='w-full h-5/6 border-solid border-2 p-[1vw]'>
									<div className='w-full h-full'>
										<DictionarySearch />
									</div>
								</div>
								<div className='flex items-center justify-center w-full h-1/6 border-solid border-2 gap-[15%]'>
									<button type='button'>
										<img src={Pencil} />
									</button>
									<button type='button'>
										<img src={Highlight} />
									</button>
									<button type='button'>
										<img src={Eraser} />
									</button>
								</div>
							</div>
							<div className='w-4/5 h-full border-solid border-2 px-[5%] pt-[3%] pb-[5%]'>
								<div className='w-full h-full overflow-y-auto'>
									<MainText />
								</div>
							</div>
						</div>
						<div
							className={`relative flex flex-col transition-all duration-300 ease-in-out ${isBottomOpen ? 'h-1/3' : 'h-1/12'}`}
						>
							<div className='w-full h-1/12 flex justify-center' onClick={toggleBottom}>
								<img src={isBottomOpen ? DownArrow : UpArrow} />
							</div>
							<div
								className={`w-full h-full p-[1vw] transition-all duration-300 ease-in-out border-solid border-2 ${isBottomOpen ? 'block' : 'hidden'}`}
							>
								<TextBox />
							</div>
						</div>
					</div>
					<div
						className={`relative flex h-screen transition-all duration-300 ease-in-out border-solid border-2 ${isRightOpen ? 'w-1/5' : 'w-1/24'}`}
					>
						<div className='h-screen bg-white flex items-center' onClick={toggleRight}>
							<img src={isRightOpen ? RightArrow : LeftArrow} />
						</div>
						<div
							className={`w-11/12 h-full transition-all duration-300 ease-in-out ${isRightOpen ? 'block' : 'hidden'}`}
						>
							<div className='w-full h-4/5 overflow-y-auto'>
								<Memos />
							</div>
							<div className='flex flex-col items-center w-full h-1/5'>
								<div className='w-full m-[10%]'>
									<Button className='w-full border bg-gray-400 text-white border-gray-300 hover:bg-gray-500'>
										<div className='flex items-center'>
											<span>임시 저장</span>
										</div>
									</Button>
								</div>
								<div className='w-full mx-[10%]'>
									<Button className='w-full border bg-blue-700 text-white border-blue-300 hover:bg-blue-800'>
										<div className='flex items-center'>
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
