// this modal is rendered by employeeShow component
// the state that controls this modal, whether the modal is open or not will live in the employeeShow component
// the state AND the updaterfunction associated with that state is passed here as a prop

import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import FeedbackForm from '../shared/FeedbackForm'
import { createFeedbackSuccess, createFeedbackFailure } from '../shared/AutoDismissAlert/messages'
import { createFeedback } from '../../api/feedback'
// this modal has its own props that it needs in order to open and close
// since we will be using the feedbackForm as well, we'll need those props

const NewFeedbackModal = (props) => {
    const { employee, show, handleClose, msgAlert, triggerRefresh } = props

    const [feedback, setFeedback] = useState({})

    // we'll use updateemployee in our onSubmit
    const onChange = (e) => {
        e.persist()

        setFeedback(prevFeedback => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            const updatedFeedback = { [updatedName] : updatedValue }

            return {
                ...prevFeedback, ...updatedFeedback
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        // make our api call -> createfeedback
        createFeedback(employee._id, feedback)
            // close the modal
            .then(() => handleClose())
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: createFeedbackSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if anything goes wrong, send an error message
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: createFeedbackFailure,
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
                    heading={`Give ${employee.name} a feedback!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewFeedbackModal