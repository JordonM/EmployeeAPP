import EmployeesIndex from "./employee/IndexEmployee"
import { Container } from 'react-bootstrap'


const Home = (props) => {
	 const { msgAlert, user } = props

	return (
		<div className='row'>
		<Container className='m-2' style={{ textAlign: 'center' }}>
			<h2>Home Page</h2>
			<EmployeesIndex msgAlert={msgAlert} />
		</Container>
		</div>
	)
}

export default Home
