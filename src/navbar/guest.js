import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../components/home";
import Login from "../components/Login";
import Register from "../components/register";

function Guest() {

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="navbar-nav">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Benesse</a>
          </div>
          <ul className="navbar-nav">
            {/* <li className="active nav-item"><Link className="nav-link" to="/">Home</Link></li> */}
            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <Routes>
          {/* <Route path="/" element={<Home/>}/> */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default Guest;
