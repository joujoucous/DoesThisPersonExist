import Link from "next/link";
import Button from 'react-bootstrap/Button'
import Image from 'next/image'
//<Image class="homeImage" src="/images/image.jpg" alt="me" layout="fill"/>
//<Image class="homeImage" src="/images/image.jpg" alt="me" layout="fill" />
const Home = () => (
  <div style={{backgroundColor: 'black'}}>
    <div class="content-center my-auto">
        <div class="title-brand">
          <h1 class="stripe-text">Can you guess who's real ?</h1>
        </div>
    </div>
    <div class="imageContainer">
      <div class="homeImage">
      </div>
      <div class="homeImage2">
      </div>
    </div>
    
  </div>
);
export default Home;