import { useEffect, useState } from 'react';
import './Login.scss';
import { login } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Link } from 'react-router-dom';

const Login = () => {

    const { loginContext } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // useEffect(() => {
    //     try {
    //         let token = localStorage.getItem("token");
    //         if (token) {
    //             navigate('/home');
    //         }
    //     } catch (e) {

    //     }
    // }, []);

    const handleLogin = async () => {
        if (!email && !password) {
            return;
        }

        try {
            setLoading(true);
            let res = await login(email, password);
            if (res && res.token) {
                loginContext(email, res.token)
                navigate('/home')
            }
            setLoading(false);
        } catch (e) {
        }
    }

    return <>
        <div className="login-container col-12 col-sm-4">
            <div className='title'>Log in</div>
            <div className='text'>Email or username (eve.holt@reqres.in)</div>
            <input type='text' placeholder="Email" value={email}
                onChange={(event) => setEmail(event.target.value)} />
            <div className='password-container'>
                <input type={showPassword === true ? 'text' : 'password'} placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)} />
                <i className={showPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                    onClick={() => setShowPassword(!showPassword)}></i>
            </div>
            <button className={(email && password && !loading) ? 'active' : 'unactive'} onClick={() => handleLogin()}>
                {loading && <i className="fa-sharp fa-solid fa-atom fa-spin"></i>}
                &nbsp;Login
            </button>
            <div className='back'>
                <i className="fa-solid fa-angle-left"></i>
                <Link to='/home' style={{ color: 'black' }}>Go back</Link>
            </div>
        </div >
    </>
}

export default Login;