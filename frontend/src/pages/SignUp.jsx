import React from 'react'
import { useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { ClipLoader } from "react-spinners"
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function SignUp() {
    // --- UPDATED THEME COLORS ---
    const primaryColor = "#0f766e"; // Deep Teal
    const hoverColor = "#0d9488";   // Lighter Teal
    const bgColor = "#f0fdfa";      // Very Light Teal/Mint background
    const borderColor = "#e2e8f0";  // Soft Slate border
    // ----------------------------

    const [showPassword, setShowPassword] = useState(false)
    const [role, setRole] = useState("user")
    const navigate = useNavigate()
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("")
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    // Axios is a JavaScript library used to make HTTP requests from a web application to a server. It allows sending and receiving data asynchronously, typically in JSON format. In your code, axios.post() sends a POST request to the backend API (${serverUrl}/api/auth/signup) with user data like fullName, email, password, mobile, and role. It’s commonly used for API calls such as login, signup, fetching data, or submitting forms.
    const handleSignUp = async () => {
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`, {
                fullName, email, password, mobile, role
            }, { withCredentials: true })
            dispatch(setUserData(result.data))
            setErr("")
            setLoading(false)
        } catch (error) {
            setErr(error?.response?.data?.message)
            setLoading(false)
        }
    }

    const handleGoogleAuth = async () => {
        if (!mobile) {
            return setErr("mobile no is required")
        }
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        try {
            const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                fullName: result.user.displayName,
                email: result.user.email,
                role,
                mobile
            }, { withCredentials: true })
            dispatch(setUserData(data))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
            <div className={`bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border-[1px]`} style={{
                border: `1px solid ${borderColor}`
            }}>
                <h1 className={`text-3xl font-extrabold mb-2 `} style={{ color: primaryColor }}>ZaikaBox</h1>
                <p className='text-slate-500 mb-8'> Create your account to get started with delicious food deliveries
                </p>

                {/* fullName */}
                <div className='mb-4'>
                    <label htmlFor="fullName" className='block text-slate-700 font-medium mb-1'>Full Name</label>
                    <input type="text" className='w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-100 focus:outline-none transition-all' placeholder='Enter your Full Name' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setFullName(e.target.value)} value={fullName} required />
                </div>

                {/* email */}
                <div className='mb-4'>
                    <label htmlFor="email" className='block text-slate-700 font-medium mb-1'>Email</label>
                    <input type="email" className='w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-100 focus:outline-none transition-all' placeholder='Enter your Email' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>

                {/* mobile*/}
                <div className='mb-4'>
                    <label htmlFor="mobile" className='block text-slate-700 font-medium mb-1'>Mobile</label>
                    <input type="text" className='w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-100 focus:outline-none transition-all' placeholder='Enter your Mobile Number' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setMobile(e.target.value)} value={mobile} required />
                </div>

                {/* password*/}
                <div className='mb-4'>
                    <label htmlFor="password" className='block text-slate-700 font-medium mb-1'>Password</label>
                    <div className='relative'>
                        <input type={`${showPassword ? "text" : "password"}`} className='w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-100 focus:outline-none pr-10 transition-all' placeholder='Enter your password' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setPassword(e.target.value)} value={password} required />

                        <button className='absolute right-3 cursor-pointer top-[14px] text-gray-400' onClick={() => setShowPassword(prev => !prev)}>{!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
                    </div>
                </div>

                {/* role*/}
                <div className='mb-6'>
                    <label htmlFor="role" className='block text-slate-700 font-medium mb-2'>Join as a</label>
                    <div className='flex gap-2'>
                        {["user", "owner", "deliveryBoy"].map((r) => (
                            <button
                                key={r}
                                className='flex-1 border rounded-lg px-2 py-2 text-sm text-center font-semibold transition-all cursor-pointer capitalize'
                                onClick={() => setRole(r)}
                                style={
                                    role === r ?
                                        { backgroundColor: primaryColor, color: "white", borderColor: primaryColor } :
                                        { border: `1px solid ${borderColor}`, color: "#64748b" }
                                }>
                                {r === "deliveryBoy" ? "Delivery" : r}
                            </button>
                        ))}
                    </div>
                </div>

                <button 
                    className={`w-full font-bold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center`} 
                    onClick={handleSignUp} 
                    disabled={loading}
                    style={{ backgroundColor: primaryColor, color: 'white' }}
                    onMouseOver={(e) => e.target.style.backgroundColor = hoverColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = primaryColor}
                >
                    {loading ? <ClipLoader size={20} color='white' /> : "Create Account"}
                </button>

                {err && <p className='text-red-500 text-sm text-center mt-3 font-medium'>! {err}</p>}

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or continue with</span></div>
                </div>

                <button className='w-full flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition-all cursor-pointer duration-200 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium' onClick={handleGoogleAuth}>
                    <FcGoogle size={20} />
                    <span>SignUp with Google</span>
                </button>

                <p className='text-center mt-6 text-sm text-gray-600 cursor-pointer' onClick={() => navigate("/signin")}>
                    Already have an account? <span className='font-bold' style={{ color: primaryColor }}>Sign In</span>
                </p>
            </div>
        </div>
    )
}

export default SignUp