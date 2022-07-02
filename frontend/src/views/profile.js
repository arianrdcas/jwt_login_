import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Profile = props => {


    const {store, actions } = useContext(Context);
    const {
        profile
    } = store;
    const history = useHistory();

    useEffect(() =>{
        if (!store.isAuth) history.push('/');
        actions.getProfile(); 
    },[]) 

    return (
        <>
            {
                !!profile && !!profile.sucess?
                (
                    <h1 className="m-3">Perfil no encontrado</h1>
                ):
                    <h1 className="m-3">Perfil de {store.currentUser.user.username}</h1>
            } 

             {/* {!!store.error && (
              <div className="alert alert-danger h5" role="alert">
                <i className="bi bi-exclamation-circle-fill text-danger"></i> {store.error}
              </div>
            )}   
            { {
                !!profile && 
                !!profile.success ?
                (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Success:</strong> {store.username}.
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                ):(
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Mensaje:</strong> {store?.msg}.
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )
            }  */}
        </>    
    )
};
