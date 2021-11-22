import { useState } from "react";
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



function App() {

  const [user, setUser] = useState()
  return (

    <div id="wrapper" className="App">

      {/* <Login /> */}

      {/* user ? (<Register />) : ( */}

      <Router>
        <Nav />
        <div id="content-wrapper" className="d-flex flex-column">

          <div id="content">
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/warehouse-manage" component={WareHouseManage} />
            </Switch>
            {/* <WareHouseManage /> */}
            <Footer />
          </div>

        </div>
      </Router>

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
