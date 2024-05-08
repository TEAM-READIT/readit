import { Card } from 'flowbite-react';

const Content = ({ content }: { content :string}) => {

		const linechange = (text: string) => {
			return text.replace(/\n/g, '\n\n');
		};

	const realcontent = linechange(content);
	
	return (
		<>
			<div className='flex w-1/2 h-4/5'>
				<Card className='w-full py-10 '>
					<div className='overflow-auto text-start whitespace-pre-wrap px-3'>{realcontent}</div>
				</Card>
			</div>
		</>
	);
};

export default Content;
