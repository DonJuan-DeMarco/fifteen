import './Square.css';
const Square = (props) => {
	return (
		<div
			className={`bg-info ${
				props.value === 0 ? 'EmptySquare' : 'FillSquare'
			}`}
			onClick={() => props.clickHandler(props.value)}
		>
			{props.value}
		</div>
	);
};

export default Square;
