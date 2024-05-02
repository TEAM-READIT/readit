import { Card } from 'flowbite-react';

const Content = ({ content }: { content :string}) => {

	return (
		<>
			<div className='flex w-1/2 h-4/5 py-20 '>
				<Card className='w-full py-10 '>
					<div className='overflow-auto text-start'>{content}</div>
				</Card>
			</div>
		</>
	);
};

export default Content;
