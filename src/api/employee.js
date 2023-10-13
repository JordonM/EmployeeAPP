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

// CREATE 
export const createEmployee = (user, newEmployee) => {
    return axios({
        url: `${apiUrl}/employees`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { employee: newEmployee }
    })
}
// UPDATE 
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

// DELETE 
export const removeEmployee = (user, employeeId) => {
    return axios({
        url: `${apiUrl}/employees/${employeeId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}