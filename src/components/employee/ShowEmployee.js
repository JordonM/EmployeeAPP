
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


import { getOneEmployee, updateEmployee, removeEmployee } from '../../api/employee'

import { showEmployeesFailure, showEmployeesSuccess, removeEmployeeSuccess, removeEmployeeFailure } from '../shared/AutoDismissAlert/messages'





const wageCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}
const feedbackCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row'
}

const ShowEmployee = (props) => {
    const [employee, setEmployee] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [wageModalShow, setWageModalShow] = useState(false)
    const [feedbackModalShow, setFeedbackModalShow] = useState(false)
   
    const [updated, setUpdated] = useState(false)

    const navigate = useNavigate()

  
    const { id } = useParams()
    const { user, msgAlert } = props


    useEffect(() => {
        getOneEmployee(id)
            .then(res => setEmployee(res.data.employee))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting employees.',
                    message: showEmployeesFailure,
                    variant: 'danger'
                })
            })
    }, [updated])

    const setEmployeeFree = () => {

        removeEmployee(user, employee._id)
     
            .then(() =>
                msgAlert({
                    heading: `${employee.name} has been terminated.`,
                    message: removeEmployeeSuccess,
                    variant: 'success',
                })
            )

            .then(() => navigate('/'))
          
            .catch(() =>
                msgAlert({
                    heading: 'There has been an error with termination.',
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
            wageCards = <p>Select a button to pay employee.</p>
        }
    }

    if(!employee) {
        return <LoadingScreen />
    }

    let feedbackCards
    if (employee) {
        if (employee.feedbacks.length > 0) {
            feedbackCards = employee.feedbacks.map(feedback => (
                <FeedbackShow 
                    key={feedback.id}
                    feedback={feedback}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                    user={user}
                    employee={employee}
                />
            ))
        } else {
            feedbackCards = <p>Select a button to add a comment.</p>
        }
    }

    return (
        <>  
            <div className="row">
            <Container className='m-2' variant="light">
                <Card>
                    <Card.Header>{ employee.name }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Age: {employee.dob}</small><br/>
                            <small>Position: {employee.position}</small><br/>
                            <small>
                                Part-Time: {employee.paid ? 'yes' : 'no'}
                            </small><br/>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <Button className="m-2" variant="dark"
                            onClick={() => setWageModalShow(true)}
                        >
                            Give {employee.name} a Paycheck!
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
                    <Button className="m-2" variant="dark"
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
            <Container className='m-2' style={feedbackCardContainerLayout}>
                {feedbackCards}
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