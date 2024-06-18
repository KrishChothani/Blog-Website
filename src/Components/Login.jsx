import React ,{useState} from 'react'
import {Link, Navigate, useNavigate } from 'react-router-dom'
import {login as authlogin} from '../Store/authSlice'
import {Btn , Input , Logo  } from './index'
import authService from '../Appwrite/auth'
import {useForm} from 'react-hook-form'
import { useDispatch } from 'react-redux'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error , seteError] = useState("")

    const login = async(data) =>{
        seteError("")
        try {
           const session =  await authService.login(data)
           if(session) {
                const useData = await authService.getCurrentUser();
                if(useData) dispatch(authlogin(useData));
                navigate("/");
           }
        } catch (error) {
            seteError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg  bg-gray-100 rounded-xl border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your Email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                    matchPatern: (value) =>
                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email address must be a valid email address " ,
                },
              })}
            />
            <Input 
                label="Password"
                type="password"
                placeholder="Enter Your Password"
                {...register("password", {
                  required: true,
                })
              }
            />
            <Btn 
              type="submit"
              className="w-full"
            >Sign In</Btn>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login
