import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Profile = props => {


    const {store, actions } = useContext(Context);
    
    const history = useHistory();

    useEffect(() =>{
        if (!store.isAuth) history.push('/login');
        actions.getProfile(); 
    },[]) 

    return (
        <>
            {
                !!store.profile && (
                    <h1 className="m-3">Perfil de {store.currentUser.user.username}</h1>
                )
                
            } 
        </>    
    )
};
