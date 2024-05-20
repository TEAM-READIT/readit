import { Card } from 'flowbite-react';
import { ChallengeProps } from '../../types/challengeProps';

const Content = ({ problems }: { problems: ChallengeProps }) => {
	const linechange = (text: string) => {
		return text?.replace(/\n/g, '\n\n');
	};

	const realcontent = linechange(problems.content);

	return (
		<>
			<div className='flex w-1/2 h-4/5'>
				<Card className='w-full py-10 '>
					<div className='font-bold text-2xl pb-3 leading-8 tracking-wide'>{problems.title}</div>
					<div className='text-lg overflow-auto text-start whitespace-pre-wrap px-3'>{realcontent}</div>
				</Card>
			</div>
		</>
	);
};

export default Content;
