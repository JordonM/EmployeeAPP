

import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import WageForm from '../shared/WageForm'
import { createWageSuccess, createWageFailure } from '../shared/AutoDismissAlert/messages'
import { createWage } from '../../api/wage'


const NewWageModal = (props) => {
    const { employee, show, handleClose, msgAlert, triggerRefresh } = props

    const [wage, setWage] = useState({})

   
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

        
        createWage(employee._id, wage)
            
            .then(() => handleClose())
        
            .then(() => {
                msgAlert({
                    heading: 'Paycheck created!',
                    message: createWageSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            
            .catch(() => {
                msgAlert({
                    heading: 'There has been an error!',
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
                    heading={`Give ${employee.name} a paycheck!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewWageModal