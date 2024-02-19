import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Auth(){
    const navigate = useNavigate();
    const getToken = () =>{
        const tok  = localStorage.getItem('token');
        const userTok = JSON.parse(tok);
        return userTok;
    }
    const getUser = ()=>{
        const user = localStorage.getItem('user');
        const userTok = JSON.parse(user);
        return userTok;
    }
    const logoutUser = () => {
        console.log('lou')
        localStorage.clear();
        navigate('/login');
    }
    const saveToken = (user,token)=>{
        localStorage.setItem('user',JSON.stringify(user))   
        localStorage.setItem('token',JSON.stringify(token))
        console.log(token,'---tokenState',user);
        navigate('/quiz');

    }
    const endPoint = axios.create({
        baseURL:'http://localhost:8000/api/',
        headers:{
            "Content-type" : "application/json"
        }
    })
    return  {
        setToken:saveToken,
        getToken,
        endPoint,
        logoutUser,
        getUser
    }
}