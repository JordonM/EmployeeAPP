import { useState } from 'react'
import { createEmployee } from '../../api/employee'
import { createEmployeeSuccess, createEmployeeFailure } from '../shared/AutoDismissAlert/messages'
import EmployeeForm from '../shared/EmployeeForm'

// to redirect to a different component(page) we can use a hook from react-router
import { useNavigate } from 'react-router-dom'

const EmployeeCreate = (props) => {
    // pull out our props for easy reference
    const { user, msgAlert } = props

    // to utilize the navigate hook from react-router-dom
    const navigate = useNavigate()

    const [employee, setEmployee] = useState({
        name: '',
        position: '',
        dob: '',
        paid: false
    })

    const onChange = (e) => {
        // e is the placeholder for event
        e.persist()

        setEmployee(prevEmployee => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // the above is enough for string inputs
            // but we have a number and a boolean to handle
            if (e.target.type === 'number') {
                // if the target type is a number - updateValue must be a number
                updatedValue = parseInt(e.target.value)
            }

            // to handle our checkbox, we need to tell it when to send a true, and when to send a false. we can target it by the unique name(paid) and handle it the way checkboxes are meant to be handled.
            // a checkbox only sends the value 'checked' not the boolean we need
            if (updatedName === 'paid' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'paid' && !e.target.checked) {
                updatedValue = false
            }
            
            // build the employee object, grab the attribute name from the field and assign it the respective value.
            const updatedEmployee = { [updatedName] : updatedValue }

            // keep all the old employee stuff and add the new employee stuff(each keypress)
            return {
                ...prevEmployee, ...updatedEmployee
            }
        })
    }

    const onSubmit = (e) => {
        // we're still using a form - the default behavior of a form is to refresh the page
        e.preventDefault()

        // we're making an api call here
        // so we want to handle the promise with then and catch
        // first we want to send our create request
        createEmployee(user, employee)
            // then navigate the user to the show page if successful
            .then(res => { navigate(`/employees/${res.data.employee.id}`)})
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createEmployeeSuccess,
                    variant: 'success'
                })
            })
            // if it fails, keep the user on the create page and send a message
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: createEmployeeFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <EmployeeForm 
            employee={employee} 
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new employee!"
        />
    )
}

export default EmployeeCreate