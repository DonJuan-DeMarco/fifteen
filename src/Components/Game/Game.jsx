import { useEffect, useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Square from './Square';
import { timerActions } from '../../store/timer';

import './Game.css';

const winOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

function shuffle(array) {
	return [...array].sort(() => Math.random() - 0.5);
}

const squares = Array.from({ length: 16 }, (_, i) => i);

function ModalOverlay(props) {
	return (
		<div className='overlay d-flex align-items-center justify-content-center'>
			<div className='content d-flex align-items-center'>
				{props.children}
			</div>
		</div>
	);
}

const Game = () => {
	const dispatch = useDispatch();
	const isActive = useSelector((state) => state.timer.isActive);

	const [randomSquares, setRandomSquares] = useState([]);
	const [winCondition, setWinCondition] = useState(false);

	useEffect(() => {
		setRandomSquares(() => shuffle(squares));
	}, []);

	useEffect(() => {
		if (JSON.stringify(winOrder) === JSON.stringify(randomSquares)) {
			dispatch(timerActions.stop());
			setWinCondition(true);
		}
	}, [randomSquares, dispatch]);

	function moveSquare(val) {
		let zeroIndex = randomSquares.indexOf(0);
		let valIndex = randomSquares.indexOf(val);

		if (valIndex + 4 === zeroIndex || valIndex - 4 === zeroIndex) {
			swap(valIndex, zeroIndex);
		} else if (valIndex + 1 === zeroIndex && zeroIndex % 4 !== 0) {
			swap(valIndex, zeroIndex);
		} else if (valIndex - 1 === zeroIndex && (zeroIndex + 1) % 4 !== 0) {
			swap(valIndex, zeroIndex);
		}

		if (!isActive) {
			dispatch(timerActions.start());
		}
	}

	function swap(valIndex, zeroIndex) {
		let temArray = [...randomSquares];
		temArray[zeroIndex] = randomSquares[valIndex];
		temArray[valIndex] = 0;
		setRandomSquares(() => [...temArray]);
	}

	const reset = () => {
		dispatch(timerActions.reset());
		setRandomSquares(() => shuffle(randomSquares));
		setWinCondition(false);
	};

	return (
		<>
			<Container className='Container bg-dark m-auto '>
				{winCondition && (
					<ModalOverlay>'WINNER WINNER CHICKEN DINNER'</ModalOverlay>
				)}
				{randomSquares.map((e) => {
					return (
						<div key={e} className='Container-Sub bg-secondary'>
							<Square value={e} clickHandler={moveSquare} />
						</div>
					);
				})}
			</Container>
			<Container className='text-center m-auto my-3'>
				<Button variant='outline-light' onClick={reset}>
					Restart
				</Button>
			</Container>
		</>
	);
};

export default Game;
