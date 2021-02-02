import { Alert } from "../node_modules/react-bootstrap";
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'



const Identification = (props) => {
    const { islogged } = props; //savoir si le mec est loggé
    const router = useRouter()
    const [isRedirected, setIsRedirected] = useState(false)
   
    useEffect(()=>{
        if(!islogged && (router.pathname !== "/" && router.pathname !== "/login" && router.pathname !== "/sign-up")){
            router.push('/')
            setIsRedirected(true)
        }
        else if(islogged && (router.pathname == "/" || router.pathname == "/login" && router.pathname == "/sign-up")){
            router.push('/profil')
        }
    }, [router.pathname])

        return (
            <>
            {
                isRedirected && 
                <Alert variant="danger">
                    Please login or signup before accessing the game !
                </Alert>
            }
            </>
        );
}
export default Identification;