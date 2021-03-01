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
    const [data, setData] = useState({})

    useEffect( () =>  {

        async function fetchData() {
            const ISSERVER = typeof window === "undefined";
            if(!ISSERVER) {
                const userId= sessionStorage.getItem('userId')
                const res = await fetch(`http://${process.env.PROFIL_HOST}:5006/profil/${userId}`)
                const data = await res.json();
                return setData({
                        username: data.username,
                        email: data.email,
                })
            }
        }
        fetchData();
    },[]);

        return (
        <Container>
            <div>
                <h1>Profil</h1>
                <p>Username: {data.username}</p>
                <p>Email: {data.email}</p>
            </div>
        </Container>

    )
}

export default Profil;