import Link from "next/link";
import { Form, Button, Container, Row, Col } from "../node_modules/react-bootstrap";
import { useRouter } from 'next/router'

function Login() {
  const router = useRouter()

  const registerUser = async event => {
    event.preventDefault()

    const res = await fetch(`http://${process.env.AUTH_HOST}:5000/api/auth/login`, {
      body: JSON.stringify({
        username: event.target.login.value,
        password: event.target.password.value        
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    const result = await res.json()
    const token = result.accessToken
    const userId = result.id;

    if(token) {
      sessionStorage.setItem('accessToken', token);
      sessionStorage.setItem('userId', userId);
      await router.push('/profil')
    }
  }


  return (
    <Container>
      <Row className="justify-content-center">
      <Col id="animatedBackground">
        <Container id="Special" >
          <h1>Login</h1>
          <Form onSubmit={registerUser} method="POST">
            <Form.Group controlId="formBasicUsername">
              <Form.Label>User name</Form.Label>
              <Form.Control name="login" type="text" placeholder="Enter user name" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </Col>
      </Row>
    </Container>
  )
};

export default Login;