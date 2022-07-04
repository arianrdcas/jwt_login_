import React, { useContext }  from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Login } from "../views/login";
import { Logout } from "../views/logout";

const Navbar = (props) => {
  const {store, actions}=useContext(Context)
  const history = useHistory()
  const location = useLocation();

  const logout = () =>{
    actions.logout(history)
  };

   


  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className={"nav-link " + (location.pathname === '/' ? "active" : "")} to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className={"nav-link " + (location.pathname === '/profile' ? "active" : "") } to="/profile">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link className={"nav-link " + (location.pathname === '/registro' ? "active" : "")} to="/registro">
            Registro
          </Link>
        </li>
        {
          !store.isAuth ? (
          <li className="nav-item">
            <Link className={"nav-link " + (location.pathname === '/login' ? "active" : "")} to="/login">
                Login
            </Link>
          </li>
          ) :
          (
            <li className="nav-item">
              <Link className="nav-link" onClick={logout} to="/login">
                Logout
              </Link>
            </li>
          )
        } 
      </ul>
    </div>
  );
};

export default Navbar;