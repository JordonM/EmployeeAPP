import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { removeWage } from '../../api/wage'
import { removeWageSuccess, removeWageFailure } from '../shared/AutoDismissAlert/messages'
import EditWageModal from './EditWageModal'

const WageShow = (props) => {
    const { wage, msgAlert, triggerRefresh, user, employee } = props

   
    const [editModalShow, setEditModalShow] = useState(false)

  
    const setBgCondition = (cond) => {
      
        if (cond === 'new') {
            return({width: '18rem', backgroundColor: '#b5ead7'})
        } else if (cond === 'disgusting') {
            return({width: '18rem', backgroundColor: '#ffdac1'})
        } else {
            return({width: '18rem', backgroundColor: '#ff9aa2'})
        }
    }
    const setWageCondition = (cond) => {
      
        if (cond === 'new') {
            return('Weekly')
        } else if (cond === 'disgusting') {
            return('Bi-Weekly')
        } else {
            return('Monthly')
        }
    }    
    const destroyWage = () => {
       
        removeWage(user, employee._id, wage._id)
           
            .then(() =>
                msgAlert({
                    heading: `Wage Deleted!`,
                    message: removeWageSuccess,
                    variant: 'success',
                })
            )
            // triggerRefresh
            .then(() => triggerRefresh())
            
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