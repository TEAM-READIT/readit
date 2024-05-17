import { useState } from "react"
import ReadDetail from "./ReadDetail"
import SavedDetail from "./SavedDetail"
import { Breadcrumb, BreadcrumbItem } from "flowbite-react"
import { Link } from "react-router-dom"
import Headers from "../../../components/Headers"
import topbtn from '../../../assets/images/topbtn.png';

const ArticleDetail = () => {
  const [number, setNumber] = useState<number>(0)
  	const handletop = () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
  };
  
  return (
		<>
			<div className='w-full h-full flex justify-center flex-col items-center select-none pr-5'>
				<Headers />

				<div className='flex flex-col w-3/5 justify-start items-center '>
					<div className='flex flex-row w-full justify-between px-5 pb-10 items-center'>
						<div className=' w-full'>
							<Breadcrumb className='pb-8'>
								<BreadcrumbItem>
									<Link to='/'>홈</Link>
								</BreadcrumbItem>
								<BreadcrumbItem>
									<Link to='/mypage'>마이 페이지</Link>
								</BreadcrumbItem>
								<BreadcrumbItem>
									{number === 0 ? (
										<div className='hover:cursor-pointer'>내가 읽은 글</div>
									) : (
										<div className='hover:cursor-pointer'>내가 읽고 있는 글</div>
									)}
								</BreadcrumbItem>
							</Breadcrumb>
							<div className='flex flex-row gap-10 items-center w-full py-0.5'>
								<h1
									className={` font-semibold leading-tight ${number === 0 ? 'text-gray-700 text-2xl' : 'text-gray-400 text-xl'} hover:cursor-pointer`}
									onClick={() => setNumber(0)}
								>
									내가 읽은 글 목록
								</h1>
								<h1
									className={` font-semibold leading-tight ${number === 1 ? 'text-gray-700 text-2xl' : 'text-gray-400 text-xl'} hover:cursor-pointer `}
									onClick={() => setNumber(1)}
								>
									내가 읽고 있는 글 목록
								</h1>
							</div>
						</div>
					</div>
				</div>
				{number === 0 ? <ReadDetail /> : <SavedDetail />}
			</div>
			<div className='fixed bottom-10 right-10 w-16 hover:cursor-pointer'>
				<img src={topbtn} alt='' onClick={handletop} />
			</div>
		</>
	);
}

export default ArticleDetail