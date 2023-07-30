import { useState } from 'react';
import './Login.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return <>
        <div className="login-container col-12 col-sm-4">
            <div className='title'>Log in</div>
            <div className='text'>Email or username</div>
            <input type='text' placeholder="Email" value={email}
                onChange={(event) => setEmail(event.target.value)} />
            <div className='password-container'>
                <input type={showPassword === true ? 'text' : 'password'} placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)} />
                <i className={showPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                    onClick={() => setShowPassword(!showPassword)}></i>
            </div>
            <button className={(email && password) ? 'active' : 'unactive'}>Login</button>
            <div className='back'>
                <i className="fa-solid fa-angle-left"></i> Go back
            </div>
        </div >
    </>
}

export default Login;