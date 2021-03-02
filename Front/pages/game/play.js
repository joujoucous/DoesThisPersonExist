import Link from "next/link";
import { Container, Button, Image } from 'react-bootstrap';
import {useEffect, useState} from 'react';

const Play = (props) => {

  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentImage, setCurrentImage] = useState({
    picture: props.picture,
    isGenerated: props.isGenerated
  })
  useEffect( () =>  {

    async function fetchData() {
      const res = await fetch(`http://${process.env.FACES_HOST}:8000/face/`)
      const newData = await res.json();
      return setCurrentImage({
        picture: newData[0].picture,
        isGenerated: newData[0].isGenerated
      });
    }
    fetchData();
  },[]);
  const fetchData = async () => {
    const res = await fetch(`http://${process.env.FACES_HOST}:8000/face/`)
    const newData = await res.json();
    return setCurrentImage({
      picture: newData[0].picture,
      isGenerated: newData[0].isGenerated
    });
  };

  const saveScore = async () => {
    const userId = sessionStorage.getItem('userId');

    const res = await fetch(`http://${process.env.GAMES_HOST}:${process.env.GAMES_PORT}/api/game`, {
      body: JSON.stringify({
        user: userId,
        score: score
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
  };


  const checkAnswer = (answer) => {
    if (answer === currentImage.isGenerated) {
      setScore(score + 1)
      fetchData();
    } else {
      saveScore();
      setIsGameOver(true)
    }
  };

  return (
    <>
      <h1>Play</h1>
      <Link href="/">
        <a>Back to home</a>
      </Link>
      <Container fluid className="d-flex h-100 p-5 flex-column  align-items-center justify-content-center">
        {isGameOver ?
          <div>Game over ! Score : {score}</div>
          :
          <>
          <div>Score : {score}</div>
            <Image className="h-25 w-25" src={"data:image/jpg;base64," + currentImage.picture} rounded />
            <Container fluid className="d-flex h-100 justify-content-center">
              <Button onClick={() => { checkAnswer(0) }} className="m-5" variant="success">It's real !</Button>
              <Button onClick={() => { checkAnswer(1) }} className="m-5" variant="danger">It's fake !</Button>
            </Container>
          </>
        }
      </Container>
    </>
  );
}
export default Play;