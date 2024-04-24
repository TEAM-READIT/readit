import { Card } from 'flowbite-react';

interface LoginProps {
	close: () => void;
}

const MemberDetail = ({ close }: LoginProps) => {


	return (
		<>
			<div className='bg-black absolute z-50 w-screen h-[1200px] opacity-70 flex flex-col  justify-center items-center'></div>
			<Card className='flex flex-col w-full max-w-[800px] h-[500px] mt-24 absolute z-50  border-2 justify-start left-1/2 top-1/3  transform -translate-x-1/2 -translate-y-1/2'>
				<div className='flex flex-row w-full  justify-between font-nicolast'>
					<div>READIT</div>
					<div onClick={close}>x</div>
				</div>
			</Card>
		</>
	);
};

export default MemberDetail;
