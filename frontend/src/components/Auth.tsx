import React, { ChangeEventHandler } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Signin from '../pages/Signin';
import { useState } from 'react';
import { signupInput, signinInput } from 'medium-common-madebysaksham';
import axios from 'axios';
import {BACKEND_URL} from '../config'

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<signupInput | signinInput>(
    type === "signup"
      ? { name: "", email: "", password: "" } as signupInput
      : { email: "", password: "" } as signinInput
  );
  
  async function sendRequest(){
    try{  
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`, postInputs);
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      if(jwt){
        navigate("/blogs");
      }
    }catch(e){
      
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='h-screen flex justify-center flex-col'>
        <div className='flex justify-center px-10'>
          <div className='text-3xl font-bold'>Create an account</div>
        </div>
        <div className='mt-1'>
          <div className='text-base text-slate-500 font-medium px-10'>{type==="signup"? "Already have an account?" : "Don't have an account?"} <Link className='pl-2 !text-slate-500 !underline' to={type==="signin"? "/signup" : "/signin"}>
           {type==="signup"? "Log In":"Sign Up"}</Link></div>
        </div>
        <div className='mt-5'>
        {type === "signup" ?           <LabelledInputs label="Name" placeholder='Saksham Garg' onChange={(e) => {
            setPostInputs({
              ...postInputs,
              name: e.target.value,
            })
          }}></LabelledInputs> : null}
        </div>
        <div className='mt-4'>
          <LabelledInputs label="Email" placeholder='abcd@gmail.com' onChange={(e) => {
            setPostInputs({
              ...postInputs,
              email: e.target.value,
            })
          }}></LabelledInputs>
        </div>
        <div className='mt-4'>
          <LabelledInputs label="Password" placeholder='Your password' type={'password'} onChange={(e) => {
            setPostInputs({
              ...postInputs,
              password: e.target.value,
            })
          }}></LabelledInputs>
        </div>
        <button onClick={sendRequest} type="button" className="mt-7 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup"? "Sign Up": "Sign In"}</button>
      </div>
    </div>
  )
}


interface LabelledInputType {
  label: string; 
  placeholder: string;
  onChange: (e: any) => void;
  type?: string;
}

function LabelledInputs({ label, placeholder, onChange, type }: LabelledInputType) {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
        <input onChange={onChange} type={type} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
      </div>
    </div>
  )
}


export default Auth