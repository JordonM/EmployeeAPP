
import { Form, Button, Container } from 'react-bootstrap'

const WageForm = (props) => {
   
    const { wage, handleChange, handleSubmit, heading } = props

    return (
        <div className="row">
        <Container className="justify-content-center">
            <h3>Employee Pay Form:</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Job Positon:</Form.Label>
                    <Form.Control 
                        placeholder="What is their job position?"
                        id="name"
                        name="name"
                        value={ wage.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Pay Amount:</Form.Label>
                    <Form.Control 
                        placeholder="What is the amount?"
                        id="frequency"
                        name="frequency"
                        value={ wage.frequency }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Check 
                        label="Did the employee use PTO?"
                        name="isSqueaky"
                        defaultChecked={ wage.isSqueaky }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Select 
                        aria-label="wage condition"
                        name="condition"
                        defaultValue={ wage.condition }
                        onChange={handleChange}
                    >
                        <option>Choose A Pay Period</option>
                        <option value="new">Weekly</option>
                        <option value="used">Bi-Weekly</option>
                        <option value="disgusting">Monthly</option>
                    </Form.Select>
                </Form.Group>
                <Button className="m-2" type="submit" variant="success">Submit</Button>
            </Form>
        </Container>
        </div>
    )

}

export default WageForm