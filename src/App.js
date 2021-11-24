import { createContext, useState } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import Nav from "./components/Nav";
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WareHouseManage from "./pages/warehouseManage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
}
  from 'react-router-dom'
import PrivateRoute from "./components/PrivateRoute";
import Page404 from "./pages/Page404";
import authServices from "./services/authServices";
export const Context = createContext()




function App() {

  const [user, setUser] = useState(localStorage.getItem('loginAdmin'))
  const [loginError, setLoginError] = useState()
  const login = async (form) => {
    try {
      let res = await authServices.login(form)
      // console.log(`token`, res.accessToken)
      if(res?.success){
        localStorage.setItem('loginAdmin',JSON.stringify(res))
        localStorage.setItem('token',JSON.stringify(res.accessToken))
        setUser(localStorage.getItem('loginAdmin'))
        setLoginError()
      }
      else{
        setLoginError(res?.message)
      }
    }
    catch (err) {
      console.log(`err`, err)
    }

  }
  const logout = () => {
    localStorage.removeItem('loginAdmin')
    setUser(localStorage.getItem('loginAdmin'))
    setLoginError()
  }
  return (

    <div id="wrapper" className="App">

      {/* <Login /> */}

      {/* user ? (<Register />) : ( */}
      <Context.Provider value={{ user,loginError, login, logout }}>
        <Router>
          {
            !user ? (<Login />) :
              (
                <>
                  <Nav />
                  <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">
                      <Header />
                      <Switch>
                        <PrivateRoute exact path="/" component={Home} />
                        <PrivateRoute path="/warehouse-manage" component={WareHouseManage} />
                        <PrivateRoute> <Page404 /> </PrivateRoute>
                      </Switch>
                      {/* <WareHouseManage /> */}
                      <Footer />
                    </div>

                  </div>
                </>
              )
          }
        </Router>
      </Context.Provider>

      {/* <Nav />
      <div id="content-wrapper" className="d-flex flex-column">
        
        <div id="content">
          <Header />
          
          <Home />
          <Footer />
        </div>
      </div> */}
    </div>
  );
}

export default App;
