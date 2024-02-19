import { useState } from "react"
import Auth from "./Auth";
import { Navigate } from "react-router-dom";
export default function Register(){
    const {endPoint} = Auth();

    const [Email,setEmail] = useState('');
    const [Password,setPassword] = useState('');
    const [name,setName] = useState('');
    const handleLogin = async()=>{
        let res;
        try{
            res = await endPoint.post('register',{email:Email,password:Password,name:name});
        }catch(e){
            console.log(e)
            alert(JSON.stringify(e.response.data.errors))
        }
        // const res = await endPoint.post('login',{});
        if(res){
            
            Navigate('/login');
        }else{
            // alert(res)
        }
        console.log(Email,Password,'===1Login',res);
    }
    

    return (
        <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                <div className="form-group">
                    <label>Enter Name:</label>
                    <input type="text" className="form-control" id="name" onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <label>Enter Email address:</label>
                    <input type="email" className="form-control" id="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className="form-group mt-4">
                    <label>Set Password:</label>
                    <input type="password" className="form-control" id="pwd" onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <button type="button" className="btn btn-primary mt-4" onClick={handleLogin}>Register</button>
                </div>
            </div>
        </div>
    )
}