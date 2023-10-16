import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'


import { getAllEmployees } from '../../api/employee'


import messages from '../shared/AutoDismissAlert/messages'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const EmployeesIndex = (props) => {
    const [employees, setEmployees] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

 
    useEffect(() => {
        getAllEmployees()
            .then(res => {
               
                setEmployees(res.data.employees)
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error getting Employees',
                    message: messages.indexEmployeesFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

 
    if (error) {
        return <LoadingScreen />
    }

    
    if (!employees) {
        return <LoadingScreen />
   
    } else if (employees.length === 0) {
        return <p>No employees yet, go add some!</p>
    }
    

    const employeeCards = employees.map(employee => (
        <Card key={ employee.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ employee.name }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/employees/${employee.id}`} className='btn btn-dark'>
                        View { employee.name }
                    </Link>
                </Card.Text>
                { employee.owner ? 
                    <Card.Footer></Card.Footer>
                : null }
            </Card.Body>
        </Card>
    ))

    return (
   
        <div className="container-md" style={ cardContainerLayout }>
            { employeeCards }
        </div>
    )
}


export default EmployeesIndex