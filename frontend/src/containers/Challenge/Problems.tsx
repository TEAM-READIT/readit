import { Button, Card } from 'flowbite-react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useAuthStore } from '../../store/auth';
import { problemListProps, answerList } from '../../types/challengeProps';

const Problems = ({ articleId, problemList }: { problemList: problemListProps[]; articleId: number }) => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const { accessToken } = useAuthStore();
	const [answer, setAnswer] = useState<answerList[]>([]);
	const [myAnswer, setMyAnswer] = useState<answerList[]>([]);
	const [selectedOptions, setSelectedOptions] = useState<number[]>([]); // 추가된 state

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

	const handleAnswerSelection = (problemIndex: number, optionIndex: number) => {
		setMyAnswer((prevState) => {
			const updatedAnswer = [...prevState];
			updatedAnswer[problemIndex] = {
				problemNumber: problemIndex + 1,
				answerNumber: optionIndex + 1,
			};
			return updatedAnswer;
		});
		setSelectedOptions((prevState) => {
			const updatedSelectedOptions = [...prevState];
			updatedSelectedOptions[problemIndex] = optionIndex;
			return updatedSelectedOptions;
		});
	};

	const isOptionSelected = (problemIndex: number, optionIndex: number) => {
		return selectedOptions[problemIndex] === optionIndex;
	};

	return (
		<>
			<div className='h-full w-1/3 flex flex-col'>
				<div className='flex h-4/5 py-20 '>
					<Card className='w-full overflow-auto'>
						<div className=' flex flex-col text-start gap-y-10 p-3'>
							{problemList.map((problem, index) => (
								<div key={index}>
									<div className='font-bold text-lg'>{problem.problem}</div>
									<br />
									{problem.optionList.map((option, optionidx) => (
										<div
											key={optionidx}
											className={`flex flex-row gap-x-2 hover:cursor-pointer ${
												isOptionSelected(index, optionidx) ? 'bg-yellow-100' : ''
											}`}
											onClick={() => handleAnswerSelection(index, optionidx)}
											style={{ paddingRight: '5px' }}
										>
											<div className='relative'>{option.optionNumber}.
											{isOptionSelected(index, optionidx) && <div className='absolute left-0 top-0'>✔</div>}
											</div>
											<div>{option.option}</div>
										</div>
									))}
									<div className='flex flex-row justify-end'>
										{myAnswer[index] && <div>내가 선택한 답: {myAnswer[index].answerNumber}</div>}
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
