import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE -> Add wage
// '/wages/:employeeId'
export const createWage = (employeeId, newWage) => {
    return axios({
        url: `${apiUrl}/wages/${employeeId}`,
        method: 'POST',
        data: { wage: newWage }
    })
}

// UPDATE -> Change employee
// '/wages/:employeeId/:wageId'
export const updateWage = (user, employeeId, updatedWage) => {
    return axios({
        url: `${apiUrl}/wages/${employeeId}/${updatedWage._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { wage: updatedWage }
    })
}

// DELETE -> Set a employee free
// '/wages/:employeeId/:wageId'
export const removeWage = (user, employeeId, wageId) => {
    return axios({
        url: `${apiUrl}/wages/${employeeId}/${wageId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}