import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { removeFeedback } from '../../api/feedback'
import { removeFeedbackSuccess, removeFeedbackFailure } from '../shared/AutoDismissAlert/messages'
import EditFeedbackModal from './EditFeedbackModal'

const FeedbackShow = (props) => {
    const { feedback, msgAlert, triggerRefresh, user, employee } = props

   
    const [editModalShow, setEditModalShow] = useState(false)

    const setBgCondition = (cond) => {
        
        if (cond === 'new') {
            return({width: '18rem', backgroundColor: '#b5ead7'})
        } else if (cond === 'used') {
            return({width: '18rem', backgroundColor: '#ffdac1'})
        } else {
            return({width: '18rem', backgroundColor: '#ff9aa2'})
        }
    }

    const destroyFeedback = () => {
        // we want to remove the employee
        removeFeedback(user, employee._id, feedback._id)
            // send a success message
            .then(() =>
                msgAlert({
                    heading: `feedback Deleted!`,
                    message: removeFeedbackSuccess,
                    variant: 'success',
                })
            )
            // triggerRefresh
            .then(() => triggerRefresh())
            // send a fail message if there is an error
            .catch(() =>
                msgAlert({
                    heading: 'Oh no!',
                    message: removeFeedbackFailure,
                    variant: 'danger',
                })
            )
    }

    return (
        <>
            <Card className='m-2' style={setBgCondition(feedback.condition)}>
                <Card.Header>{feedback.name}</Card.Header>
                <Card.Body>
                    <small>{feedback.comment}</small><br/>
                </Card.Body>
                <Card.Footer>
                    {
                        user && employee.owner && user._id === employee.owner._id
                        ?
                        <>
                            <Button 
                                className="m-2" variant="warning"
                                onClick={() => setEditModalShow(true)}
                            >
                                Update Feedback
                            </Button>
                            <Button 
                                className="m-2" variant="danger"
                                onClick={() => destroyFeedback()}
                            >
                                Delete Feedback
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditFeedbackModal 
                user={user}
                employee={employee}
                feedback={feedback}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default FeedbackShow