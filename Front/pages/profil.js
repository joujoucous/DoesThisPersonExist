import Link from "next/link";
import { Form, Button, Container, Row, Col } from "../node_modules/react-bootstrap";
import {ToastContainer} from "react-nextjs-toast";

function Profil() {

    let username = "test";
    let email = "test";

    return (

    <Container>
        <Row className="justify-content-center">
            <Container id="Special" >
                <h1>Profil</h1>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username: {username} </Form.Label>
                        <br/>
                        <Form.Label>Email: {email}</Form.Label>
                    </Form.Group>
                </Form>
            </Container>
        </Row>
    </Container>
    );

}

export default Profil;