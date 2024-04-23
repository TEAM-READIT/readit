import { Card } from 'flowbite-react';
import Chart from './Chart/Chart';
import Profile from './Chart/Profile';
import Read from './Read/Read';
import MyGroup from './Group/MyGroup';

const Stats = () => {
	return (
		<>
			<div className='flex flex-col gap-y-11'>
				<Card>
					<div className='flex flex-row w-full justify-center items-center'>
						<Profile />
						<Chart />
					</div>
				</Card>
				<Card>
					<Read />
				</Card>
				<Card>
					<MyGroup />
				</Card>
			</div>
		</>
	);
};

export default Stats;
