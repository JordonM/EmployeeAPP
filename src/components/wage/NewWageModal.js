// this modal is rendered by employeeShow component
// the state that controls this modal, whether the modal is open or not will live in the employeeShow component
// the state AND the updaterfunction associated with that state is passed here as a prop

import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import WageForm from '../shared/WageForm'
import { createWageSuccess, createWageFailure } from '../shared/AutoDismissAlert/messages'
import { createWage } from '../../api/wage'
// this modal has its own props that it needs in order to open and close
// since we will be using the wageForm as well, we'll need those props

const NewWageModal = (props) => {
    const { employee, show, handleClose, msgAlert, triggerRefresh } = props

    const [wage, setWage] = useState({})

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
        createWage(employee._id, wage)
            // close the modal
            .then(() => handleClose())
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: createWageSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if anything goes wrong, send an error message
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: createWageFailure,
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
                    heading={`Give ${employee.name} a wage!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewWageModal