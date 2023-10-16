
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import FeedbackForm from '../shared/FeedbackForm'
import { updateFeedbackSuccess, updateFeedbackFailure } from '../shared/AutoDismissAlert/messages'
import { updateFeedback } from '../../api/feedback'


const EditFeedbackModal = (props) => {
    const { user, employee, show, handleClose, msgAlert, triggerRefresh } = props

    const [feedback, setFeedback] = useState(props.feedback)

    // we'll use updateemployee in our onSubmit
    const onChange = (e) => {
        e.persist()

        setFeedback(prevFeedback => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (updatedName === 'isSqueaky' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'isSqueaky' && !e.target.checked) {
                updatedValue = false
            }

            const updatedFeedback = { [updatedName] : updatedValue }

            return {
                ...prevFeedback, ...updatedFeedback
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        // make our api call -> createfeedback
        updateFeedback(user, employee._id, feedback)
            // close the modal
            .then(() => handleClose())
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: updateFeedbackSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if anything goes wrong, send an error message
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: updateFeedbackFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <FeedbackForm 
                    feedback={feedback}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update the Feedback"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditFeedbackModal