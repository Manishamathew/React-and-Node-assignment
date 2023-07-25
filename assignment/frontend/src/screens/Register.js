import { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom"

function SubmitForm() {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate()

  const handleNameChange = (e) => {
    setUsername(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setEmailError(false); 
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setPasswordError(false); 
  }
  const handleSubmit = event => {
    event.preventDefault();
    navigate("/")
  const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
  const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
  const email = event.target.email.value;
  const password = event.target.password.value;
  const isEmailValid = validEmail.test(email);
  const isPasswordValid = validPassword.test(password);
  if (!isEmailValid) {
      setEmailError(true);
    }
  if (!isPasswordValid) {
      setPasswordError(true);
    }
  if (isEmailValid && isPasswordValid) {
      console.log(name, email, password);
  try {
      axios.post('http://localhost:5000/register',{name,email,password})
          .then(res => {
            console.log("reeeeeeeeeeeee",res);
            if (res.data === "exist") {
              alert("User already exists");
            } else if (res.data === "Not exist") {
              alert("Registration successful");
            }
            
          })
          .catch(error => {
            console.error(error);
            alert("An error occurred during registration.");
          });
      } 
  catch (error) {
        console.error(error);
        alert("An error occurred during registration.");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter Name:
        <input type="text" name="name" value={name} onChange={handleNameChange} />
      </label><br/>
      <label>"Enter email"</label>
      <input type="text" name="email" placeholder="Enter Email" className="login-input" value={email} onChange={handleEmailChange} />
      {emailError && <span style={{ color: "red" }}>Invalid email format</span>}<br/>
      <label>Enter password</label>
      <input type="password" name="password" placeholder="Enter Password.." className="login-input" value={password} onChange={handlePasswordChange} />
      {passwordError && <span style={{ color: "red" }}>Password must be at least 6 characters long and contain letters and numbers</span>}<br/>
      <button type="submit">Submit</button>
      <br/>
    </form>
  );
}
export default SubmitForm;

