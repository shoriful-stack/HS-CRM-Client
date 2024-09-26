import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import backgroundImg from '../assets/images/crmImg.avif';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const adminInfo = {
        email: 'admin@gmail.com',
        password: 'admin'
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === adminInfo.email && password === adminInfo.password) {
            localStorage.setItem('userEmail', JSON.stringify({ email }));
            localStorage.setItem('userPass', JSON.stringify({ password }));
            toast.success('Login successful!');
            navigate('/dashboard');
        } else {
            toast.error('Invalid email or password!');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImg})` }}>
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                <div className="flex justify-center mb-6">
                    <div className="bg-gray-200 p-4 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-10 w-10 text-teal-500">
                            <path d="M12 12c2.97 0 5.35-2.17 5.87-5.01A5.992 5.992 0 0 0 12 2c-2.68 0-4.94 1.79-5.77 4.23C6.68 9.95 9.12 12 12 12zM12 14c-4.41 0-8 3.59-8 8h2c0-3.31 2.69-6 6-6s6 2.69 6 6h2c0-4.41-3.59-8-8-8z" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-3xl font-semibold text-center text-gray-700 mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group mb-4">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-3 flex items-center">
                                <FaUser className="h-4 w-5" />
                            </span>
                            <input
                                type="email"
                                name="email"
                                className="w-full px-4 py-3 pl-10 border border-blue-700 rounded-lg focus:outline-none"
                                placeholder="Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-3 flex items-center">
                                <FaLock className="h-4 w-5" />
                            </span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className="w-full px-4 py-3 pl-10 border border-blue-700 rounded-lg focus:outline-none"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                            </span>
                        </div>
                    </div>
                    <div className="form-control">
                        <button type="submit" className="btn bg-teal-500 hover:bg-teal-300 text-white w-full">Login</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
