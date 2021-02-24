import Link from "next/link";
import { Form, Button, Container, Row, Col } from "../node_modules/react-bootstrap";

const Login = () => (
  <Container>
    <Row className="justify-content-center">
    <Col id="animatedBackground">
      <Container id="Special" >
        <h1>Login</h1>
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>User name</Form.Label>
            <Form.Control type="text" placeholder="Enter user name" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </Col>
    </Row>
  </Container>
    

);
export default Login;