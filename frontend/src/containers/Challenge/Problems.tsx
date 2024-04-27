import { Button, Card } from 'flowbite-react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useAuthStore } from '../../store/auth';
import { problemListProps, answerList } from '../../types/challengeProps';

const Problems = ({ articleId, problemList }: { problemList: problemListProps[]; articleId: number }) => {
	// 챌린지 답 POST
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const { accessToken } = useAuthStore();
	// 백에서 받아올 정답 
	const [answer, setAnswer] = useState<answerList[]>([]);
	// 내가 선택한 답 
	const [myAnswer, setMyAnswer] = useState<answerList[]>([]);
	const requestBody = {
		articleId: articleId,
		answerList: myAnswer,
	};
	const answerPost = useMutation(async () => {
		const response = await fetch(`${baseUrl}/challenge`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		});
		return response.json();
	});
	const handleAnswer = async () => {
		try {
			const data = await answerPost.mutateAsync();
			setAnswer(data);
		} catch (error) {
			console.error('정답을 불러오기 실패', error);
		}
	};

	// 정답 고르는 함수
	const handleAnswerSelection = (problemIndex: number, optionIndex: number) => {
		setMyAnswer((prevState) => {
			const updatedAnswer = [...prevState];
			updatedAnswer[problemIndex] = {
				problemNumber: problemIndex + 1,
				answerNumber: optionIndex + 1,
			};
			return updatedAnswer;
		});
	};
	return (
		<>
			<div className='h-full w-1/3 flex flex-col'>
				<div className='flex h-4/5 py-20 '>
					<Card className='w-full'>
						<div className=' flex flex-col text-start gap-y-10 p-3'>
							{problemList.map((problem, index) => (
								<div key={index}>
									<div className='font-bold text-lg'>{problem.problem}</div>
									<br />
									{problem.optionList.map((option, optionidx) => (
										<div key={optionidx} className='flex flex-row gap-x-2'>
											<div onClick={() => handleAnswerSelection(index, optionidx)}>{option.optionNumber}.</div>
											<div>{option.option}</div>
										</div>
									))}
									<div className='flex flex-row justify-end'>
										{myAnswer[index] && ( // Check if answer exists for this problem
											<div>내가 선택한 답: {myAnswer[index].answerNumber}</div>
										)}
									</div>
								</div>
							))}
						</div>
					</Card>
				</div>
				<div className='flex justify-end'>
					<Button
						className='border w-1/3 bg-blue-700 text-white border-blue-300 hover:bg-blue-800'
						onClick={handleAnswer}
					>
						제출하기
					</Button>
				</div>
			</div>
		</>
	);
};

export default Problems;
