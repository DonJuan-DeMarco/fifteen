import logo from './logo.svg';
import './App.css';
import { Row, Button, Container, Col, ButtonGroup } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
const App = () => {
	return (
		<Container fluid className='container-fluid bg-dark vh-100'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		</Container>
	);
};

export default App;
