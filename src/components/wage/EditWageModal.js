

import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import WageForm from '../shared/WageForm'
import { updateWageSuccess, updateWageFailure } from '../shared/AutoDismissAlert/messages'
import { updateWage } from '../../api/wage'


const EditWageModal = (props) => {
    const { user, employee, show, handleClose, msgAlert, triggerRefresh } = props

    const [wage, setWage] = useState(props.wage)

    
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

       
        updateWage(user, employee._id, wage)
            
            .then(() => handleClose())
            
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: updateWageSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            
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