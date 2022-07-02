import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Context } from "../store/appContext";

export const Login = (props) => {

  const { store, actions } = useContext(Context);
  const history = useHistory();

  const {handleChange, handleSubmit} = actions;

   const {
      username,
      password,
      error
  } = store;

  /*const { 
        handleChange, 
        handleSubmit, 
        } = actions; */


  /* const [data, setData] = useState({
    username: "",
    password:""
  })     

  const dataInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const sendData = (e) => {
    e.preventDefault();
    actions.login(data,history)
    setData({
      email: "",
      password: "",
    });
  };
 */


  useEffect(() => {
    if (store.isAuth) history.push("/login");
  }, []);
  return (
    <>
      <h1 className="m-3">Login</h1>
      {
          !!store.error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error:</strong> {store.error}.
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          )
      }
      <form onSubmit={(e) => handleSubmit(e, history)} className="mx-auto" style={{ width: "50%" }} method="post">
        <input
          type="text"
          name="username"
          className="form-control my-2"
          placeholder="Ingrese username"
          value={username}
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          className="form-control my-2"
          placeholder="Ingrese password"
          value={password}
          onChange={handleChange}
          autoComplete="off"
        />
        <div className="d-grid gap-2">
          <button className="btn btn-info btn-block btn-sm">
            Login
          </button>
          {/* <button className="btn btn-info btn-danger btn-block btn-sm">
            Logout
          </button> */}
        </div>
      </form>
    </>
  );
};
