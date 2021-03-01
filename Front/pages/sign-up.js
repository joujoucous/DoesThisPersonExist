import Link from "next/link";
import { Form, Button, Container, Row, Col } from "../node_modules/react-bootstrap";
import { toast, ToastContainer } from 'react-nextjs-toast';
import { useRouter } from 'next/router'

function SignUp() {
  const router = useRouter()

  const registerUser = async event => {
    event.preventDefault()

    const res = await fetch(`http://${process.env.AUTH_HOST}:5000/api/auth/register`, {
      body: JSON.stringify({
        username: event.target.login.value,
        email: event.target.email.value,
        password: event.target.password.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    const result = await res.json().catch(e => {
      console.log(e)
    }).then((data) => {
      if(res.status==400){
        toast.notify( data.message, {
          duration: 5
        });
      }else {
        router.push('/login')
      }
    })
  }

  return (
    <Container>
    <Row className="justify-content-center">
    <Col id="animatedBackground">
        <Container id="Special" >
        <ToastContainer />
          <h1>Sign up</h1>
          <Form onSubmit={registerUser} method="POST">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" placeholder="Enter email adress" />
            </Form.Group>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
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
}
export default SignUp;