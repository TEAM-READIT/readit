import { Button, Card } from 'flowbite-react';
interface problemListProps {
	problemNumber: number;
	problem: string;
	optionList: optionListProps[];
}

interface optionListProps {
	optionNumber: number;
	option: string;
}

const Problems = ({ problemList }: { problemList: problemListProps[] }) => {
	
  
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
										<div key={optionidx}>
											{option.optionNumber} . {option.option}
										</div>
									))}
								</div>
							))}
						</div>
					</Card>
				</div>
				<div className='flex justify-end'>
					<Button className='border w-1/3 bg-blue-700 text-white border-blue-300 hover:bg-blue-800 '>제출하기</Button>
				</div>
			</div>
		</>
	);
};

export default Problems;
