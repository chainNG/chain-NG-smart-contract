import React from 'react'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { toast } from 'sonner'
import {zodResolver} from '@hookform/resolvers/zod' 
import {z,string} from'zod'
import { useAuthStore } from '../services/store/index'
import { ArrowUpIcon, CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { supabase } from '../utils/supabaseClient'
import {useNavigate} from 'react-router-dom'

const signupSchema = z.object({
    company_name: string().optional(),
    email: string().email(),
    password: string().min(6,{message: 'Password must contain at least 6 characters'})
})


const Login = () => {

    
   const navigate = useNavigate()

    const {loginState,setLoginState,user,setUser} = useAuthStore()
    const [session, setSession] = useState(null)
    const [authToggle, setAuthToggle] = useState(true)
    const { register, handleSubmit,getValues,control,formState } = useForm({
      resolver:zodResolver(signupSchema)
    })
    
    const {errors} = formState
    // console.log(errors)
    
      const handleSignIn = async (data) => {
  
        console.log(data)
        const { user, error } = await supabase.auth.signInWithPassword({
          email: data?.email,
          password: data?.password
        })
        if (error) {
            toast.error('Error Signing In', {
                className: 'font-mono text-lg h-[4rem]',
                duration: 4000,
                icon:<CrossCircledIcon/>
              })
        } else {
            toast.success('Login Succesful, ', {
                className: 'font-mono text-lg h-[4rem]',
                duration: 4000,
                icon:<CheckCircledIcon/>
              })
            
              const {data:{user}} = await supabase.auth.getUser()
             
              if (Object.keys(user) !== 0){
                setUser(user)
                setTimeout(()=>{
                    navigate('/')
                },3000)
              }
          // Use the token to authorize the user to access resources in your application
        }
      }

      const onSubmitLogin = () => {
        if(Object.keys(errors) !== 0) {
          handleSignIn(getValues())
      
        }
   
    }



    return (
  
          <form onSubmit={handleSubmit(onSubmitLogin)}>
  
            <Card className=' w-full px-4 sm:w-[500px]'>
              <CardHeader>
                <div className=''>
                  <h3 className='font-jakarta text-2xl font-semibold'>Sign In</h3>
                </div>
              </CardHeader>
  
  
              <CardContent className='flex flex-col gap-6'>
                <div className='flex font-jakarta flex-col gap-4'>
                  <Label className='flex flex-col gap-2' htmlFor="email">Email
                    <Input {...register('email')}  id='email' placeholder='Email' />
                    <div className='text-red-500 '>{errors.email?.message}</div>
                  </Label>
                  <Label className='flex flex-col gap-2' htmlFor="password ">Password
                    <Input {...register('password')}  className='mt-3' id='password' placeholder='Password' />
                    <div className='text-red-500 '>{errors.password?.message}</div>
                  </Label>
  
                </div>
                <Button type='submit'  className='h-10 text-md font-jakarta'> Sign In</Button>
              </CardContent>
  
              <CardFooter className='w-full flex flex-col items-start gap-2' >
                <div  className='font-jakarta flex-col items-start  flex sm:flex-row w-full justify-between'>
                <Button variant='Outline'>
                  Forgot Password?
                </Button>
  
                <Button onClick={() => { navigate('/Signup') }} variant='Outline'>
                  Don't have an account?
                </Button>
                </div>

                {loginState ===  true ? 
              <Link  to='https://www.gmail.com'> Signup Successful, Please Confirm Your Mail </Link> : ''}

              </CardFooter>
            </Card>
          </form> 
    )
  }

  export default Login