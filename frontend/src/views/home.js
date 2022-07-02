import { useContext, useEffect } from "react"
import { useHistory } from "react-router";
import { Context } from "../store/appContext";

export const Home = props => {

    const {store, actions } = useContext(Context);
    const history = useHistory();

    useEffect(() =>{
         if (!store.isAuth) history.push('/login'); 
    },[history])

    return (
        <>
            <h1 className="m-3">Home</h1>
        </>    
    )
} 