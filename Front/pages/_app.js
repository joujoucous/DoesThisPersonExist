import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../components/menu';
import Identification from '../components/identification';

function MyApp({ Component, pageProps }) {

  const ISSERVER = typeof window === "undefined";
  let logged = false;
  console.log(logged);
  if(!ISSERVER) {
      const token = sessionStorage.getItem('accessToken')
      if(token) {
          logged = async () => {
              const res = await fetch(`http://${process.env.AUTH_HOST}:5000/api/verify`, {
                  headers: {
                      'Content-Type': 'application/json',
                      'x-access-token': token
                  },
                  method: 'GET'
              })

              logged = await res.json()
          }
      }
  }
  return (
    <>
      <Identification islogged={logged}/>
      <Menu/>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
