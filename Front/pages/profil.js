import Link from "next/link";
import {Container} from "../node_modules/react-bootstrap";
import {useEffect, useState} from "react";

export async function getStaticProps(context) {

    return {
     props: {
         username:"fail"
     }
    };

}

const Profil = (props) => {
    const [data, dataSet] = useState<any>({

    })

    useEffect(async () => {
        const ISSERVER = typeof window === "undefined";
        if(!ISSERVER) {
            console.log("ALO")
            const userId= localStorage.getItem('userId')
            const res = await fetch(`http://${process.env.PROFIL_HOST}:5006/profil/${userId}`)
            const data = await res.json();
            console.log(data);
            return {
                props: {
                    username: data.username,
                    email: data.email,
                },
            }

        }

    },[]);

        return (
        <Container>
            <div>
                <h1>Profil</h1>
                <p>Username: {props.username}</p>
                <p>Email: {props.email}</p>
            </div>
        </Container>

    )
}

export default Profil;