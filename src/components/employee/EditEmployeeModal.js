import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import EmployeeForm from '../shared/EmployeeForm'
import { updateEmployeeSuccess, updateEmployeeFailure} from '../shared/AutoDismissAlert/messages'
import { updateEmployee } from '../../api/employee'

// this modal has its own props that it needs in order to open and close
// since we will be using the employeeForm as well, we'll need those props

const EditEmployeeModal = (props) => {
    const { user, show, handleClose, updateEmployee, msgAlert, triggerRefresh } = props

    const [employee, setEmployee] = useState(props.employee)

    // we'll use updateemployee in our onSubmit
    const onChange = (e) => {
        e.persist()

        setEmployee(prevEmployee => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            if (updatedName === 'adoptable' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'adoptable' && !e.target.checked) {
                updatedValue = false
            }

            const updatedEmployee = { [updatedName] : updatedValue }

            return {
                ...prevEmployee, ...updatedEmployee
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        // make our api call -> updateemployee
        updateEmployee(user, employee)
            // close the modal
            .then(() => handleClose())
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: updateEmployeeSuccess,
                    variant: 'success'
                })
            })
            // trigger a refresh of the employeeShow component
            .then(() => triggerRefresh())
            // if anything goes wrong, send an error message
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: updateEmployeeFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <EmployeeForm 
                    employee={employee}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update Employee"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditEmployeeModal