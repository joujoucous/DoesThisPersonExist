import Link from "next/link";
import {Container} from "../node_modules/react-bootstrap";


export async function getUserInformation() {
    const ISSERVER = typeof window === "undefined";;
    if(!ISSERVER) {
        const userId= localStorage.getItem('userId')
        const res = await fetch(`http://${process.env.PROFIL_HOST}:5006/profil/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET'
            })
        const result = await res.json();
        return result.username;

    }
}
function Profil() {
    getUserInformation();

    return (
        <Container>
            <div>
                <h1>Profil</h1>
            </div>
        </Container>

    )
}

export default Profil;