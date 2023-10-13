// this modal is rendered by wageShow component
// the state that controls this modal, whether the modal is open or not will live in the wageShow component
// the state AND the updaterfunction associated with that state is passed here as a prop

import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import WageForm from '../shared/WageForm'
import { updateWageSuccess, updateWageFailure } from '../shared/AutoDismissAlert/messages'
import { updateWage } from '../../api/wage'
// this modal has its own props that it needs in order to open and close
// since we will be using the wageForm as well, we'll need those props

const EditWageModal = (props) => {
    const { user, employee, show, handleClose, msgAlert, triggerRefresh } = props

    const [wage, setWage] = useState(props.wage)

    // we'll use updateemployee in our onSubmit
    const onChange = (e) => {
        e.persist()

        setWage(prevWage => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (updatedName === 'isSqueaky' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'isSqueaky' && !e.target.checked) {
                updatedValue = false
            }

            const updatedWage = { [updatedName] : updatedValue }

            return {
                ...prevWage, ...updatedWage
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        // make our api call -> createwage
        updateWage(user, employee._id, wage)
            // close the modal
            .then(() => handleClose())
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: updateWageSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if anything goes wrong, send an error message
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: updateWageFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <WageForm 
                    wage={wage}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update the Wage"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditWageModal