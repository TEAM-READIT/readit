import { Carousel } from 'flowbite-react';
import Banner1 from '../../assets/images/banner-1.jpg';
import Banner2 from '../../assets/images/banner-2.jpg';
import Banner3 from '../../assets/images/banner-3.jpg';

const Carousels = () => {
	return (
		<>
			<div className='relative h-80 mb-8 border-2 rounded-xl'>
				<Carousel slideInterval={5000} className='rounded-3xl '>
					<img src={Banner1} alt='banner1' className='w-full h-full object-cover' />
					<img src={Banner2} alt='banner2' className='w-full h-full object-cover' />
					<img src={Banner3} alt='banner3' className='w-full h-full object-cover' />
				</Carousel>
			</div>
		</>
	);
};

export default Carousels;
