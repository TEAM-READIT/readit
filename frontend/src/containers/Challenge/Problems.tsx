import { Button, Card } from 'flowbite-react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useAuthStore } from '../../store/auth';
import { problemListProps, answerList, answeranswer } from '../../types/challengeProps';
const Problems = ({ articleId, problemList }: { problemList: problemListProps[]; articleId: number }) => {
	const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
	const { accessToken } = useAuthStore();
	const [answer, setAnswer] = useState<answeranswer>();
	const [myAnswer, setMyAnswer] = useState<answerList[]>([]);
	const [selectedOptions, setSelectedOptions] = useState<number[]>([]); // 추가된 state
	const requestBody = {
		articleId: articleId,
		submitList: myAnswer,
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
	if (myAnswer.length >= 2 && myAnswer[0]?.optionNumber && myAnswer[1]?.optionNumber) {
		try {
			const data = await answerPost.mutateAsync();
			setAnswer(data);
		} catch (error) {
			console.error('정답을 불러오기 실패', error);
		}
	} else {
		alert('두 문제 다 풀어라 얍 ');
	}
};

	const handleAnswerSelection = (problemIndex: number, optionIndex: number) => {
		setMyAnswer((prevState) => {
			const updatedAnswer = [...prevState];
			updatedAnswer[problemIndex] = {
				problemNumber: problemIndex + 1,
				optionNumber: optionIndex + 1,
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
	const accurateAns = answer?.answerList

	return (
		<>
			<div className='h-full w-1/3 flex flex-col'>
				<div className='flex h-4/5  '>
					<Card className='w-full'>
						<div className='flex flex-col justify-between gap-20 h-full pt-20'>
							<div className='h-4/5 flex flex-col text-start gap-y-10 overflow-auto p-5'>
								{problemList.map((problem, index) => (
									<div key={index} className='relative'>
										<div className='font-bold'>
											{problem.problemNumber}. {problem.problem}
										</div>
										{accurateAns && (
											<div className='absolute -left-3 top-0'>
												{accurateAns[index].isCorrect ? (
													<div className='text-4xl'>⭕</div>
												) : (
													<div className='text-4xl text-pink-800'>❌</div>
												)}
											</div>
										)}
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
												<div className='relative'>
													{accurateAns && !accurateAns[index].isCorrect ? (
														<div>
															{optionidx + 1 === accurateAns[index].answerNumber ? (
																<div className='bg-red-200'>{option.option}</div>
															) : (
																<div>{option.option}</div>
															)}
														</div>
													) :
														<>{option.option}
														{ isOptionSelected(index, optionidx) && <div className='absolute left-0 top-0'>✔</div>}
														</>
													}
												</div>

											</div>
										))}
										<div className='flex flex-row justify-end'>
											{myAnswer[index] && <div>내가 선택한 답: {myAnswer[index].optionNumber}</div>}
										</div>
									</div>
								))}
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
					</Card>
				</div>
			</div>
		</>
	);
};

export default Problems;
