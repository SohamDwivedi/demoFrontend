import { useState } from "react"
import Auth from "./Auth";
export default function Login(){
    const {endPoint,setToken} = Auth();

    const [Email,setEmail] = useState('');
    const [Password,setPassword] = useState('');
    const handleLogin = async()=>{
        let res;
        try{
            res = await endPoint.post('login',{email:Email,password:Password});
        }catch(e){
            console.log(e)
        }
        // const res = await endPoint.post('login',{});
        if(res){
            
            setToken(res.data.user,res.data.access_token);
        }
        console.log(Email,Password,'===1Login',res);
    }
    

    return (
        <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                <div className="form-group">
                    <label>Email address:</label>
                    <input type="email" className="form-control" id="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className="form-group mt-4">
                    <label>Password:</label>
                    <input type="password" className="form-control" id="pwd" onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <button type="button" className="btn btn-primary mt-4" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    )
}