import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
function submit() {
    navigate("/")
  }
  return (
    <div>
      <button onClick={submit}>Logout</button>
    </div>
  );
}

export default Logout;