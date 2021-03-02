import Link from "next/link";
import {Container} from "../node_modules/react-bootstrap";
import {useEffect, useState} from "react";

const Profil = (props) => {
    const [data, setData] = useState({})
    const [bestScore, setScore] = useState({})
    console.log(bestScore)

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

        async function getBestScore() {
            const ISSERVER = typeof window === "undefined";
            if(!ISSERVER) {
                const userId= sessionStorage.getItem('userId')
                const res = await fetch(`http://${process.env.GAMES_HOST}:${process.env.GAMES_PORT}/api/game/best/user/${userId}`)
                console.log("ALO")
                const bestScore = await res.json();
                if(!bestScore.score) {
                    bestScore.score = 0;
                }
                return setScore({
                    score: bestScore.score
                })
            }
        }
        getBestScore();
        fetchData();
    },[]);

        return (
        <Container>
            <div>
                <h1>Profil</h1>
                <p>Username: {data.username}</p>
                <p>Email: {data.email}</p>
                <p>Meilleur Score: {bestScore.score} </p>
            </div>
        </Container>

    )
}

export default Profil;