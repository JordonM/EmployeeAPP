import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllEmployees = () => {
    return axios(`${apiUrl}/employees`)
}

// READ -> Show
export const getOneEmployee = (id) => {
    return axios(`${apiUrl}/employees/${id}`)
}

// CREATE -> Add employee
export const createEmployee = (user, newemployee) => {
    return axios({
        url: `${apiUrl}/employees`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { employee: newemployee }
    })
}
// UPDATE -> Change employee
export const updateEmployee = (user, updatedEmployee) => {
    return axios({
        url: `${apiUrl}/employees/${updatedEmployee._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { employee: updatedEmployee }
    })
}

// DELETE -> Set a employee free
export const removeEmployee = (user, employeeId) => {
    return axios({
        url: `${apiUrl}/employees/${employeeId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}