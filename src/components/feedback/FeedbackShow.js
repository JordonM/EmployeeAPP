import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { removeFeedback } from '../../api/feedback'
import { removeFeedbackSuccess, removeFeedbackFailure } from '../shared/AutoDismissAlert/messages'
import EditFeedbackModal from './EditFeedbackModal'

const FeedbackShow = (props) => {
    const { feedback, msgAlert, triggerRefresh, user, employee } = props

    // hook/piece of state that displays the editfeedbackModal
    const [editModalShow, setEditModalShow] = useState(false)

    // we're going to build a function that reads the feedback's condition
    // then sets a style based on that condition
    // we'll just change the background color, but you can really do anything
    // we'll return and pass the results of this function to an inline style
    const setBgCondition = (cond) => {
        // a feedback can either be new, used, or disgusting
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
                    <small>{feedback.description}</small><br/>
                    <small>{feedback.isSqueaky ? 'squeak squeak' : 'stoic silence'}</small><br/>
                </Card.Body>
                <Card.Footer>
                    <small>Condition: {feedback.condition}</small><br/>
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