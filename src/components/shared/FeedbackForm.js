
import { Form, Button, Container } from 'react-bootstrap'
import EmployeeCreate from '../employee/CreateEmployee'


const FeedbackForm = (props) => {
 
    const { feedback, handleChange, handleSubmit, heading } = props

    return (
        <div className="row">
        <Container className="justify-content-center">
            <h3> Give Employee Some Feedback. </h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Comment:</Form.Label>
                    <Form.Control 
                        placeholder="Enter A Comment"
                        id="comment"
                        name="comment"
                        value={ feedback.comment }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit" variant="success">Submit</Button>
            </Form>
        </Container>
        </div>
    )

}

export default FeedbackForm