import { Form, Button, Container } from 'react-bootstrap'

const EmployeeForm = (props) => {
    // we need several props for a working, reusable form
    // we need the object itself(employee), a handleChange, a handleSubmit
    // sometimes it's nice to have a custom heading (to diff b/w our components)
    const { employee, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        placeholder="What is your employee's name?"
                        id="name"
                        name="name"
                        value={ employee.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Position:</Form.Label>
                    <Form.Control 
                        placeholder="What type of employee is this?"
                        id="position"
                        name="position"
                        value={ employee.position }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>DOB:</Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="How old is your employee?"
                        id="dob"
                        name="dob"
                        value={ employee.dob }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Check 
                        label="Is this employee paid?"
                        name="paid"
                        defaultChecked={ employee.paid }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )

}

export default EmployeeForm