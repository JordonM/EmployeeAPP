import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE -> Add feedback
// '/feedbacks/:employeeId'
export const createFeedback = (employeeId, newFeedback) => {
    return axios({
        url: `${apiUrl}/feedbacks/${employeeId}`,
        method: 'POST',
        data: { feedback: newFeedback }
    })
}

// UPDATE -> Change employee
// '/feedbacks/:employeeId/:feedbackId'
export const updateFeedback = (user, employeeId, updatedFeedback) => {
    return axios({
        url: `${apiUrl}/feedbacks/${employeeId}/${updatedFeedback._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { feedback: updatedFeedback }
    })
}

// DELETE -> Set a employee free
// '/feedbacks/:employeeId/:feedbackId'
export const removeFeedback = (user, employeeId, feedbackId) => {
    return axios({
        url: `${apiUrl}/feedbacks/${employeeId}/${feedbackId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}