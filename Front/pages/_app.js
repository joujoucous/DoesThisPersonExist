import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../components/menu';
import Identification from '../components/identification';

function MyApp({ Component, pageProps }) {

  let logged = false;
  const token = localStorage.getItem('accessToken')
  
  const res = fetch('http://localhost:5000/api/verify', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      method: 'GET'
    })

    logged = res.json()
    console.log(res.json());
    
  
  return (
    <>
      <Identification islogged={logged}/>
      <Menu/>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
