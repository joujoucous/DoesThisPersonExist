import Link from "next/link";

import { Container, Button, Image } from 'react-bootstrap';

const Play = () => (
  <div>
    <h1>Play</h1>
    <Link href="/">
      <a>Back to home</a>
    </Link>
    <Container fluid className="d-flex h-100 p-5 flex-column  align-items-center justify-content-center">
      <Image className="h-25 w-25" src="https://picsum.photos/1024" rounded />
      <Container fluid className="d-flex h-100 justify-content-center">
        <Button className="m-5" variant="success">It's real !</Button>
        <Button className="m-5" variant="danger">It's fake !</Button>
      </Container>
    </Container>
  </div>
);
export default Play;