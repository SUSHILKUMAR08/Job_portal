import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './index.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // NOTE: We removed the code that auto-redirects to Home if logged in.
  // This allows you to view this page anytime at /login

  const submitForm = async (event) => {
    event.preventDefault();
    const url = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      
      if (response.ok === true) {
        Cookies.set('jwt_token', data.jwt_token, { expires: 30 });
        navigate('/', { replace: true });
      } else {
        setErrorMsg(data.error_msg);
      }
    } catch (error) {
      setErrorMsg("Something went wrong. Please check your connection.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={submitForm}>
        <h2 style={{ textAlign: 'center', color: '#334155' }}>Login <span><img src ="" alt="company-logo" /></span></h2>
        
        <label className="input-label">USERNAME</label>
        <input 
          className="input-field" 
          type="text" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
        />
        
        <label className="input-label">PASSWORD</label>
        <input 
          className="input-field" 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />
        
        <button type="submit" className="login-button">Login</button>
        {errorMsg && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  );
};

export default LoginForm;