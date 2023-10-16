import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { removeWage } from '../../api/wage'
import { removeWageSuccess, removeWageFailure } from '../shared/AutoDismissAlert/messages'
import EditWageModal from './EditWageModal'

const WageShow = (props) => {
    const { wage, msgAlert, triggerRefresh, user, employee } = props

    // hook/piece of state that displays the editwageModal
    const [editModalShow, setEditModalShow] = useState(false)

    // we're going to build a function that reads the wage's condition
    // then sets a style based on that condition
    // we'll just change the background color, but you can really do anything
    // we'll return and pass the results of this function to an inline style
    const setBgCondition = (cond) => {
        // a wage can either be new, used, or disgusting
        if (cond === 'new') {
            return({width: '18rem', backgroundColor: '#b5ead7'})
        } else if (cond === 'disgusting') {
            return({width: '18rem', backgroundColor: '#ffdac1'})
        } else {
            return({width: '18rem', backgroundColor: '#ff9aa2'})
        }
    }
    const setWageCondition = (cond) => {
        // a wage can either be new, used, or disgusting
        if (cond === 'new') {
            return('Weekly')
        } else if (cond === 'disgusting') {
            return('Bi-Weekly')
        } else {
            return('Monthly')
        }
    }    
    const destroyWage = () => {
        // we want to remove the employee
        removeWage(user, employee._id, wage._id)
            // send a success message
            .then(() =>
                msgAlert({
                    heading: `Wage Deleted!`,
                    message: removeWageSuccess,
                    variant: 'success',
                })
            )
            // triggerRefresh
            .then(() => triggerRefresh())
            // send a fail message if there is an error
            .catch(() =>
                msgAlert({
                    heading: 'Oh no!',
                    message: removeWageFailure,
                    variant: 'danger',
                })
            )
    }

    return (
        <>
            <Card className='m-2' style={setBgCondition(wage.condition)}>
                <Card.Header>{wage.name}</Card.Header>
                <Card.Body>
                    <small>{wage.description}</small><br/>
                    <small>{wage.isSqueaky ? 'PTO Used' : 'PTO Unused'}</small><br/>
                    <small>${wage.frequency}</small>
                </Card.Body>
                <Card.Footer>
                    <small>
                    {setWageCondition(wage.condition)}
                    </small><br/>
                    {
                        user && employee.owner && user._id === employee.owner._id
                        ?
                        <>
                            <Button 
                                className="m-2" variant="warning"
                                onClick={() => setEditModalShow(true)}
                            >
                                Update Wage
                            </Button>
                            <Button 
                                className="m-2" variant="danger"
                                onClick={() => destroyWage()}
                            >
                                Delete Wage
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditWageModal 
                user={user}
                employee={employee}
                wage={wage}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default WageShow