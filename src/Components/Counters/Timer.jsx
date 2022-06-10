import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';

import { timerActions } from '../../store/timer';

import './Timer.css';

const Timer = () => {
	const dispatch = useDispatch();
	const isActive = useSelector((state) => state.timer.isActive);
	const isReset = useSelector((state) => state.timer.isReset);

	const [seconds, setSeconds] = useState(0);
	// const [isActive, setIsActive] = useState(false);

	const toggle = () => {
		// setIsActive(!isActive);
		dispatch(timerActions.toggle());
	};

	const reset = useCallback(() => {
		setSeconds(0);
		dispatch(timerActions.clearReset());
	}, [dispatch]);

	useEffect(() => {
		let interval = null;
		if (isActive) {
			interval = setInterval(() => {
				setSeconds((seconds) => ++seconds);
			}, 1000);
		} else if (isReset) {
			reset();
			clearInterval(interval);
		} else if (!isActive && seconds !== 0) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [isActive, seconds, isReset, reset]);

	return (
		<div className='box'>
			<div className='time'>{seconds}s</div>
			<div className='row m-3'>
				<Button
					className={`button button-primary button-primary-${
						isActive ? 'active' : 'inactive'
					}`}
					variant='primary'
					onClick={toggle}
				>
					{isActive ? 'Pause' : 'Start'}
				</Button>
			</div>
		</div>
	);
};

export default Timer;
