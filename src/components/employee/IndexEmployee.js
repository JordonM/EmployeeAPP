import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'

// api function call from our api file
import { getAllEmployees } from '../../api/employee'

// we need our messages from the autodismiss alert messaged file
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

    // useEffect takes two arguments
    // first a callback function
    // second a 'dependency array'
    useEffect(() => {
        getAllEmployees()
            .then(res => {
                // console.log('the employees?', res.data.employees)
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

    // we need to account for multiple potential states of our data
    // if we have an error
    if (error) {
        return <LoadingScreen />
    }

    // if the employees aren't even loaded yet
    if (!employees) {
        return <LoadingScreen />
    // if we have NO employees
    } else if (employees.length === 0) {
        return <p>No employees yet, go add some!</p>
    }
    // console.log('the employees in employeesIndex', employees)

    const employeeCards = employees.map(employee => (
        <Card key={ employee.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ employee.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/employees/${employee.id}`} className='btn btn-info'>
                        View { employee.name }
                    </Link>
                </Card.Text>
                { employee.owner ? 
                    <Card.Footer>owner: {employee.owner.email}</Card.Footer>
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

// export our component
export default EmployeesIndex