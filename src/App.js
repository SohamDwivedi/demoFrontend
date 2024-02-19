import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "./components/Auth";
import Guest from "./navbar/guest";
import AuthUser from "./navbar/authUser";
function App() {
  const {getToken} = Auth();
  if(!getToken()){
    return <Guest/>
  }else{
    return <AuthUser/>
  }
}

export default App;
