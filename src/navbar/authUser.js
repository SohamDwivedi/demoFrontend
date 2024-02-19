import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../components/home";
import Dashboard from "../components/Dashboard";
import Auth from "../components/Auth";
import { useEffect, useState } from "react";

function AuthUser() {
  const {getToken,logoutUser,getUser} = Auth();
  const [user,setUser] = useState('');
  useEffect(()=>{
    const token = getToken();
    if(token == undefined){
        logoutUser()
    }
    const user = getUser();
    if(user){
      console.log('user',user)
      setUser(user.name);
    }
  },[])

  const logout = ()=>{
    const token = getToken();
    if(token != undefined){
        logoutUser()
    }
  }
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="row">
            <div className="col-auto">
                <div className="navbar-header">
                  <a className="navbar-brand" href="#">Welcome {user}</a>
                </div>
            </div>
            <div className="col">
              <ul className="navbar-nav">
                {/* <li className="active nav-item"><Link className="nav-link" to="/">Home</Link></li> */}
                <li className="nav-item"><Link className="nav-link" to="/quiz">Quiz</Link></li>
                <li className="nav-item"><span role="button" className="nav-link" onClick={logout}>Logout</span></li>
              </ul>
            </div>
            
          </div>
        </div>
      </nav>
      <div className="container">
        <Routes>
          {/* <Route path="/" element={<Home/>}/> */}
          <Route path="/quiz" element={<Dashboard/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default AuthUser;
