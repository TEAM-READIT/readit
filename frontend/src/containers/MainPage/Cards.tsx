import PopCards from './PopCards';
import TotalCards from './PopCommu';

interface Open{
	open:()=>void
}

const Cards = ({open}:Open) => {
	return (
		<>
			<PopCards open={open} />
			<TotalCards />
		</>
	);
};
export default Cards;
