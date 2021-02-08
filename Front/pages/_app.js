import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../components/menu';
import Identification from '../components/identification';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Identification islogged={false}/>
      <Menu/>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
