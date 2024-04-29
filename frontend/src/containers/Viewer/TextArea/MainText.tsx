import { useLocation } from 'react-router-dom';

export const MainText = () => {
	const location = useLocation();
	const article = location.state?.article;
	return (
		<>
			<div className='w-full h-full border-solid border-2 shadow-md bg-white overflow-y-auto'>
				<div className='text-2xl font-bold m-[3%]'>{article.title}</div>
				<div className='text-start mx-[2%] mb-[3%]'>{article.content}</div>
			</div>
		</>
	);
};
