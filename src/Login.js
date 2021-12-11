import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    async function handleSubmit(){
        const {data} = await axios.post("https://studentdetails-cbe.herokuapp.com/auth/login", {email, password});
        console.log(data);
        localStorage.setItem("token",data.authToken);
        console.log(data.user);
        localStorage.setItem("user",JSON.stringify(data.user))
        navigate("/getStudents")
    }

    return(
        <>
        <div>
            <div className="card login-card">
                <h4>Log In</h4>
                <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button className="btn waves-effect waves-light" onClick={handleSubmit} name="action">Login</button>
            </div>
        </div>
        </>
    )
}

export default Login;