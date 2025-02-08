import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { AiOutlineEye , AiOutlineEyeInvisible } from "react-icons/ai";
import { toast }  from 'react-hot-toast'
import Google from '../assets/google.jpeg';
import axios from 'axios';
import proxyService1 from '../proxyService1';

const Login = ({setUser}) => {
    const [isLogin,setIsLogin] = useState(true);
    const navigate = useNavigate();
    const toggleIsLogin = ()=>{setIsLogin(!isLogin)}
    const [eyeVisible,setEyeVisible] = useState(true);
    const [eyeVisibleConfirm,setEyeVisibleConfirm] = useState(true);
    const [signupFormData , setSignupFormData] = useState({userName:"",userId:"",userPassword:"",userConfirmPassword:""});
    const [loginFormData , setLoginFormData] = useState({userId:"",userPassword:""});
    const loginChangeHandler = (event)=>{
        setLoginFormData((prev)=>{
            return {...prev ,[event.target.name]:event.target.value}
        })
    }
    const signupChangeHandler = (event)=>{
        setSignupFormData((prev)=>{
            return {...prev ,[event.target.name]:event.target.value}
        })
    }

    const eyeChangeHandler = () =>{
        setEyeVisible(!eyeVisible);
    }
    const eyeChangeConfirmHandler = () =>{
        setEyeVisibleConfirm(!eyeVisibleConfirm);
    }

    const signupSubmitHandler = async(event) =>{
        event.preventDefault();
        if(signupFormData.userPassword!==signupFormData.userConfirmPassword){
            toast.error("Password donot match");
            return;
        }
        try{
            const response = await proxyService1.post('/auth/signup',{
                userName: signupFormData.userName,
                email: signupFormData.userId,
                password: signupFormData.userPassword
            })
            console.log(response.data);
            toast.success("Account Created");
            setSignupFormData({userName:"",userId:"",userPassword:"",userConfirmPassword:""});
            toggleIsLogin();
        }catch(error){
            console.log("unable to sign up",error);
            toast.error("Invalid Credential");
        }
        // setLoggedIn(true);
    }
    const loginSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            console.log("Submitting login form with data:", loginFormData);
            const response = await proxyService1.post('/auth/signin', {
                email: loginFormData.userId,
                password: loginFormData.userPassword,
            });
    
            if (response.data.token) {
                console.log("Login successful, token:", response.data.token);
                localStorage.setItem("token", response.data.token);
                setUser(response.data.token);
                navigate('/'); // Redirect to '/chat/'
                toast.success("Login successful!");
            } else {
                throw new Error("Token missing in response");
            }
        } catch (error) {
            console.error("Unable to sign in:", error);
            toast.error("Invalid credentials. Please try again.");
        }
    };

  return (
    <div className='flex justify-center bg-orange-800 min-h-[100vh] h-[800px]'>
        <div className='w-[600px] h-[700px] border rounded-xl shadow-xl my-10 relative bg-white'>
            <div className="text-center text-[50px] font-medium my-8">
                Chit Chat
            </div>
            {
                isLogin?(
                    <div>
                        <div className='text-center mb-5'>
                            <div className='text-xl'>
                                Login Account
                            </div>
                            <div className='text-sm text-gray-500'>
                                Don't have an account? <span onClick={toggleIsLogin} className='text-primary hover:underline cursor-pointer'>Create account</span>
                            </div>
                        </div>
                        <form className='flex flex-col items-center gap-4'>
                            <input type='email' placeholder='Email Address' name='userId' value={loginFormData.userId} onChange={loginChangeHandler}  className='border border-gray-300 rounded-lg w-[300px] px-3 py-2 text-sm' required></input>
                            <div className='relative'>
                                <input type={eyeVisible?("password"):("text")} placeholder='Password' name='userPassword' value={loginFormData.userPassword} onChange={loginChangeHandler}  className='border border-gray-300 rounded-lg w-[300px] px-3 py-2 text-sm' required></input>
                                <div onClick={eyeChangeHandler} className='absolute right-3 top-[10px] text-lg text-gray-400'>
                                    {eyeVisible?(<AiOutlineEye />):(<AiOutlineEyeInvisible/>)}
                                </div>
                            </div>
                            <button className='bg-orange-300 w-[300px] py-2 rounded-lg hover:bg-primary hover:text-white' onClick={loginSubmitHandler}>Log In</button>
                            <p className='text-[10px] text-gray-500 relative bottom-1'>By login you agree to our <span className='text-primary hover:underline'>Term of Use</span> and <span className='text-primary hover:underline'>PrivacyPolicy</span>.</p>
                        </form>
                        <div className='flex flex-col items-center my-3'>
                            <div className='w-[300px] my-2 flex items-center text-gray-800'>
                                <div className='border w-full'></div>
                                <div className='text-sm w-[330px] text-center'>Continue with</div>
                                <div className='border w-full'></div>
                            </div>
                            <div className='border border-gray-300 rounded-lg w-[300px] my-3 px-3 py-2 text-sm cursor-pointer relative'>
                                <div className='absolute left-3 top-1'>
                                    <img src={Google} className='h-[30px]' alt='google-img'></img>
                                </div>
                                <div className='text-center'>
                                    Google
                                </div>
                            </div>
                        </div>
                    </div>
                ):(
                    <div>
                        <div className='text-center mb-5'>
                            <div className='text-xl'>
                                Create an account
                            </div>
                            <div className='text-sm text-gray-500'>
                                Already have an account? <span onClick={toggleIsLogin} className='text-primary hover:underline cursor-pointer'>Sign in</span>
                            </div>
                        </div>
                        <form onSubmit={signupSubmitHandler} className='flex flex-col items-center gap-4'>
                            <input type='text' placeholder='Name' name='userName' value={signupFormData.userName} onChange={signupChangeHandler} className='border border-gray-300 rounded-lg w-[300px] px-3 py-2 text-sm' required></input>
                            <input type='email' placeholder='Email Address' name='userId' value={signupFormData.userId} onChange={signupChangeHandler}  className='border border-gray-300 rounded-lg w-[300px] px-3 py-2 text-sm' required></input>
                            <div className='relative'>
                                <input type={eyeVisible?("password"):("text")} placeholder='Password' name='userPassword' value={signupFormData.userPassword} onChange={signupChangeHandler}  className='border border-gray-300 rounded-lg w-[300px] px-3 py-2 text-sm' required></input>
                                <div onClick={eyeChangeHandler} className='absolute right-3 top-[10px] text-lg text-gray-400'>
                                    {eyeVisible?(<AiOutlineEye />):(<AiOutlineEyeInvisible/>)}
                                </div>
                            </div>
                            <div className='relative'>
                                <input type={eyeVisibleConfirm?("password"):("text")} placeholder='Confirm Password' name='userConfirmPassword' value={signupFormData.userConfirmPassword} onChange={signupChangeHandler}  className='border border-gray-300 rounded-lg w-[300px] px-3 py-2 text-sm' required></input>
                                <div onClick={eyeChangeConfirmHandler} className='absolute right-3 top-[10px] text-lg text-gray-400'>
                                    {eyeVisibleConfirm?(<AiOutlineEye />):(<AiOutlineEyeInvisible/>)}
                                </div>
                            </div>
                            <button className='bg-orange-300 w-[300px] py-2 rounded-lg hover:bg-primary hover:text-white'>Sign Up</button>
                            <p className='text-[10px] text-gray-500 relative bottom-1'>By login you agree to our <span className='text-primary hover:underline'>Term of Use</span> and <span className='text-primary hover:underline'>PrivacyPolicy</span>.</p>
                        </form>
                        <div className='flex flex-col items-center my-3'>
                            <div className='w-[300px] flex items-center text-gray-800'>
                                <div className='border w-full'></div>
                                <div className='text-sm w-[330px] text-center'>Continue with</div>
                                <div className='border w-full'></div>
                            </div>
                            <div className='border border-gray-300 rounded-lg w-[300px] my-3 px-3 py-2 text-sm cursor-pointer relative'>
                                <div className='absolute left-3 top-1'>
                                    <img src={Google} className='h-[30px]' alt='google-img'></img>
                                </div>
                                <div className='text-center'>
                                    Google
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Login
