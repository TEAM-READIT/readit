import { Button, Card } from 'flowbite-react';
import Headers from '../../../components/Headers';
import EssayDetailHeader from './EssayDetailHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import { articleList } from '../../../types/articleProps';
import { useAuthStore } from '../../../store/auth';
import useModal from '../../../hooks/useModal';
import Login from '../../MainPage/Login/Login';

const TextDetail = () => {
	const { accessToken } = useAuthStore();

	const navigate = useNavigate();
	const location = useLocation();
	const article = location.state?.article;
	const communityId = location.state?.communityId;

	const [isOpen, open, close] = useModal();
	const handleArticle = (article: articleList, communityId: number | null) => {
		if (accessToken) {
			navigate('/viewer', { state: { article, communityId } });
		} else {
			open();
		}
	};

	const linechange = (text: string) => {
		return text.replace(/\n/g, '\n\n');
	};

	const realarticle = linechange(article.content);

	return (
		<>
			<div className='w-full flex justify-center flex-col items-center h-full'>
				<Headers />
				<div className='flex flex-col w-3/5 h-full justify-start  items-center '>
					<EssayDetailHeader />
					<Card className='w-full p-5'>
						<div className='flex flex-col gap-y-5'>
							<div className='flex flex-row justify-between items-center'>
								<div className='text-2xl font-bold'>
									{article.title.length <= 40 ? (
										<div>{article.title} </div>
									) : (
										<div>{article.title.slice(0, 40)}...</div>
									)}
								</div>
								<Button
									className='border border-blue-800 text-blue-800 bg-transparent hover:bg-blue-900 hover:text-white flex items-center gap-2'
									onClick={() => handleArticle(article, communityId)}
								>
									<span className='material-symbols-outlined'>done</span>
									<span>글 읽으러 가기</span>
								</Button>
							</div>
							<div className='flex flex-row gap-5 items-center justify-end'>
								<div className='flex flex-row gap-1 items-center justify-center'>
									<span className='material-symbols-outlined'>visibility</span>
									<span>{article.hit +1}</span>
								</div>
								<div>{article.categoryName}</div>
							</div>
							<div className='w-full flex justify-start whitespace-pre-wrap leading-8'>
								{article.content.length <= 750 ? (
									<div className='text-start pt-5'>{realarticle} </div>
								) : (
									<div className='text-start pt-5'>{realarticle.slice(0, 750)}...</div>
								)}
							</div>
						</div>
					</Card>
				</div>
			</div>
			{isOpen ? <Login close={close} /> : null}
		</>
	);
};

export default TextDetail;
