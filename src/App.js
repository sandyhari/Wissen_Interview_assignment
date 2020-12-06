import React from "react"
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import LandingPage from "./pages/LandingPage/LandingIndex";
import AdminLoginPage from "./pages/adminLogin/LoginIndex"
import routes from "./utils/routes"
import UserRegistrationPage from './pages/userRegister/Registerindex'
import Logout from "./pages/LogoutPage/LogoutIndex";
import Home from "./pages/HomePage/HomeIndex";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={routes.landingPage}>
          <LandingPage />
        </Route>
        <Route exact path={routes.adminlogin}>
        <AdminLoginPage />
        </Route>
        <Route exact path={routes.userregister}>
          <UserRegistrationPage />
        </Route>
        <Route exact path={routes.home}>
          <Home />
        </Route>
        <Route exact path={routes.logout}>
          <Logout />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
