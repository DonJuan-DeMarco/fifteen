import React from 'react';
import Timer from '../Components/Counters/Timer';
import Game from '../Components/Game/Game';
import Header from '../Components/Header/Header';

const Home = () => {
	return (
		<>
			<Header />
			<main className='bg-dark'>
				<Timer />
				<Game />
			</main>
			<footer className='text-secondary'>
				<p className=' text-center'>Developed by Vladyslav. 2022</p>
			</footer>
		</>
	);
};

export default Home;
