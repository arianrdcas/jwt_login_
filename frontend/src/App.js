import { BrowserRouter, Switch,Route } from "react-router-dom";
import Navbar from "./components/navbar";
import injectContext from "./store/appContext";
import { Home } from "./views/home";
import { Login } from "./views/login";
import { Logout } from "./views/logout";
import { NotFound } from "./views/notfound";
import { Profile } from "./views/profile.js";
import { Registro } from "./views/registro";


function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/registro" component={Registro} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />    
      </Switch>
    </BrowserRouter>
  )
}

export default injectContext (App);
