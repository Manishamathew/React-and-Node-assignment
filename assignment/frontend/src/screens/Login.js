import { useState , useEffect } from 'react'
import { useNavigate  , Link} from "react-router-dom";
import {useCookies} from "react-cookie"

import axios from 'axios';
function Login() {
    const navigate = useNavigate();
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [cookie,setCookies] = useCookies('')

    async function submit(e){
        e.preventDefault();
        console.log("submitted")
        try{
            await axios.post("http://localhost:5000/login",{
                email,
                password,
            })
            .then(res => {
              console.log(res)
                if(res.data[0]==="exist"){
                    console.log(res.data)
                    const token = res.data[1].token
                    navigate("/" )
                    console.log("token" , token)
                    const cookieDetail = {
                       
                        token:token
                        
                    }
                    setCookies('Cookie' , cookieDetail)

                }
                else if(res.data[0]==="notexist") {
                    alert("User not exist")
                }
            }).catch(e=>{
                alert("Wrong details")
                console.log(e)
            })
        }
        catch(e){
            console.log(e)
        }
    }
 return(
        <div className="Login-container">
            <h1> Login page</h1>
            <form action="POST">
                <input type="email" placeholder="Enter Email" className="login-field" onChange={(e) => {setEmail(e.target.value)}}/>
                <input type="password" placeholder="Enter Password" className="login-field" onChange={(e) => {setPassword(e.target.value)}}/>
                <button className="login-button" onClick={submit}>Submit</button>
            </form>
             <button onClick={() => navigate("/")} className="home-button">Home</button> 

            <br/>
            <br/>

            <p>OR</p>

            <br/><br/>
            <Link to="/register" >Register</Link>
        </div>    
    )
}
export default Login