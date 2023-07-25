import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode"
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Account() {

    const [cookies,setCookies] = useCookies()
    const navigate = useNavigate()
    const cookieDetails = Cookies.get('Cookie')
        useEffect(() => {
        
        if(cookieDetails) {
        const parsedCookie = JSON.parse(cookieDetails)
       

        const decodedToken = jwt_decode(parsedCookie.token)
      
        if(decodedToken) {
        navigate("/account")
        return
        }
        }
        else{
            navigate("/login")
        }
    },[cookieDetails])
            
       

        const handleLogout = () => {
            setCookies('Cookie' , '')
            
            navigate("/login")
        }
        
  
    
    return(
        <div>
            <h1>Account</h1>
            <input type='file' />
            <button>Upload</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
        
    )
}


export default Account
