import React, {useContext} from 'react'
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import { useHistory } from "react-router";


export const Logout = props => { 
  const {store, actions}=useContext(Context)
  const history = useHistory()
  const location = useLocation();

  const logout = () =>{
    actions.logout(history)
  };

  
  return (
    <Link className="nav-link" onClick={logout} to="/login">
        Logout
    </Link>
  )
}

