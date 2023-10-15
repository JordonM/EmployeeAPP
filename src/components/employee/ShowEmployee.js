
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import EditEmployeeModal from './EditEmployeeModal'
import NewWageModal from '../wage/NewWageModal'
import WageShow from '../wage/WageShow'
import { useNavigate } from 'react-router-dom'
import NewFeedbackModal from '../feedback/NewFeedbackModal'
import FeedbackShow from '../feedback/FeedbackShow'

import { Container, Card, Button } from 'react-bootstrap'

// we'll need to import an api function to grab an individual employee
import { getOneEmployee, updateEmployee, removeEmployee } from '../../api/employee'

import { showEmployeesFailure, showEmployeesSuccess, removeEmployeeSuccess, removeEmployeeFailure } from '../shared/AutoDismissAlert/messages'

// we're going to use route parameters to get the id of the employee we're trying to retrieve from the server.
// then we use that id with our api call function
// when we finally retrieve the employee, render the details on the screen



const wageCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowEmployee = (props) => {
    const [employee, setEmployee] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [wageModalShow, setWageModalShow] = useState(false)
    const [feedbackModalShow, setFeedbackModalShow] = useState(false)
    // this is a boolean that we can alter to trigger a page re-render
    const [updated, setUpdated] = useState(false)

    const navigate = useNavigate()

    // we need to pull the id from the url
    // localhost:3000/employees/<employee_id>
    // to retrieve our id, we can use something from react-router-dom called useParams
    // this is called id, because that's how it is declared in our Route component in App.js
    const { id } = useParams()
    const { user, msgAlert } = props

    // useEffect takes two arguments
    // the callback function
    // the dependency array
    // the dependency array determines when useEffect gets called
    // if any piece of state inside the dependency array changes
    // this triggers the useEffect to run the callback function again
    // NEVER EVER EVER EVER EVER EVER EVER put a piece of state in the dependency array that gets updated by the useEffect callback function
    // doing this causes an infinite loop
    // react will kill your application if this happens
    useEffect(() => {
        getOneEmployee(id)
            .then(res => setEmployee(res.data.employee))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting employee',
                    message: showEmployeesFailure,
                    variant: 'danger'
                })
            })
    }, [updated])

    const setEmployeeFree = () => {
        // we want to remove the employee
        removeEmployee(user, employee._id)
            // send a success message
            .then(() =>
                msgAlert({
                    heading: `${employee.name} has been set free!`,
                    message: removeEmployeeSuccess,
                    variant: 'success',
                })
            )
            // navigate the user to the home page(index)
            .then(() => navigate('/'))
            // send a fail message if there is an error
            .catch(() =>
                msgAlert({
                    heading: 'Oh no!',
                    message: removeEmployeeFailure,
                    variant: 'danger',
                })
            )
    }

    let wageCards
    if (employee) {
        if (employee.wages.length > 0) {
            wageCards = employee.wages.map(wage => (
                <WageShow 
                    key={wage.id}
                    wage={wage}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                    user={user}
                    employee={employee}
                />
            ))
        } else {
            wageCards = <p>Employee has no wages, ain't that sad?</p>
        }
    }


    if(!employee) {
        return <LoadingScreen />
    }

    return (
        <>  
            <div className="row">
            <Container className='m-2'>
                <Card>
                    <Card.Header>{ employee.fullTitle }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>dob: {employee.dob}</small><br/>
                            <small>position: {employee.position}</small><br/>
                            <small>
                                Paid: {employee.paid ? 'yes' : 'no'}
                            </small><br/>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <Button className="m-2" variant="info"
                            onClick={() => setWageModalShow(true)}
                        >
                            Give {employee.name} a Wage!
                        </Button>
                        {
                            <>
                                <Button 
                                    className="m-2" variant="warning"
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    className="m-2" variant="danger"
                                    onClick={() => setEmployeeFree()}
                                >
                                    Delete
                                </Button>
                            </>
                            
                        }
                    <Button className="m-2" variant="info"
                            onClick={() => setFeedbackModalShow(true)}
                        >
                            Give {employee.name} some Feedback!
                        </Button>
                    </Card.Footer>
                </Card>
            </Container>
            <Container className='m-2' style={wageCardContainerLayout}>
                {wageCards}
            </Container>
            <EditEmployeeModal 
                user={user}
                show={editModalShow}
                updateEmployee={updateEmployee}
                msgAlert={msgAlert}
                handleClose={() => setEditModalShow(false)}
                triggerRefresh={() => setUpdated(prev => !prev)}
                employee={employee}
            />
             <NewWageModal 
                employee={employee}
                show={wageModalShow}
                msgAlert={msgAlert}
                handleClose={() => setWageModalShow(false)}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
             <NewFeedbackModal 
                employee={employee}
                show={feedbackModalShow}
                msgAlert={msgAlert}
                handleClose={() => setFeedbackModalShow(false)}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
            </div>
        </>
    )
}

export default ShowEmployee