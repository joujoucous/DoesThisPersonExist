import { Navbar, Nav } from "../node_modules/react-bootstrap";
import { useRouter } from 'next/router'

const Menu = () => {
    const router = useRouter()
    const ISSERVER = typeof window === "undefined";

    const logout= () => {
        if(!ISSERVER) {
            sessionStorage.clear();
            router.push('/')
        }
    }

    return (
            <>
                {
                    (router.pathname == "/" || router.pathname == "/login" || router.pathname == "/sign-up") &&
                    <Navbar bg="white" expand="lg">
                        <Navbar.Brand href="/">Home</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/login">Log in</Nav.Link>
                                <Nav.Link href="/sign-up">Sign up</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                }
                {
                    (router.pathname !== "/" && router.pathname !== "/login" && router.pathname !== "/sign-up") &&
                    <Navbar bg="white" expand="lg">
                        <Navbar.Brand href="/game/play">Play</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/profil">Profil</Nav.Link>
                                <Nav.Link onClick={logout}>Log out</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                }
            </>
        );
}
export default Menu;