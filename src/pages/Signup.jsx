import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Link } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { z, string } from 'zod'
import { supabase } from '../utils/supabaseClient'
import { toast } from 'sonner'
import { ArrowUpIcon, CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { useAuthStore } from "../services/store/index"
import CustomSelect from '../Reusables/CustomSelect'
import Logo from '../assets/agrichain_logo.svg'


const signupSchema = z.object({
  company_name: string().min(6),
  email: string().email(),
  contract_address: string().regex(/^0x[a-fA-F0-9]{40}$/, { message: 'Please input a valid contract address ' }),
  password: string().min(6),
  confirm_password: z.string().min(1, { message: "Confirm Password is required" }),
}).refine((data) => data.password === data.confirm_password, {
  path: ["confirm_password"],
  message: "Passwords don't match"
})

const industryOptions = [
  { value: 'Agriculture', label: 'Agriculture' },
  { value: 'Logistics', label: 'Logisitics' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Distribution', label: 'Distribution' },
  { value: 'Retailing', label: 'Retailing' },
  // Add more options as needed
];




const Signup = () => {
  const { signupState, setSignupState } = useAuthStore()

  const navigate = useNavigate()
  const [session, setSession] = useState(null)
  const { register, handleSubmit, getValues, control, formState } = useForm({
    resolver: zodResolver(signupSchema)
  })

  const { errors } = formState
  // console.log(errors)


  function openMailLink(url) {
    const newTab = window.open(url, '_blank');
    if (newTab) {
      newTab.focus();
    } else {
      alert("Popup blocked! Please allow popups for this site.");
    }
  }


  const handleSignUp = async (data) => {


    const { user, error } = await supabase.auth.signUp({
      email: data?.email,
      password: data?.password,
      options: {
        data: {
          company_name: data?.company_name,
          contract_address: data?.contract_address,
          industry: data?.industry
        }
      }
    })
    if (!error) {
      setSignupState(true)
      toast('Signup Succesful , confirm your mail', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 4000,
        icon: <CheckCircledIcon />
      })
      console.log(user)
      // const token = user.access_token
      // Use the token to authorize the user to access resources in your application
    }
else if (error){
  console.log('Error signing up:', error.message)
  setSignupState(false)
  toast(`${error.message.includes('fetch') ? 'Signup failed, please check your connection' : error.message}`, {
    className: 'font-mono text-lg h-[4rem]',
    duration: 4000,
    icon: <CrossCircledIcon />
  })
}
   
  
    
  }

  const onSubmitSignup = () => {
    if (Object.keys(errors) !== 0) {
      handleSignUp(getValues())

    }
  }

  return (

    <form onSubmit={handleSubmit(onSubmitSignup)}>

      <Card className=' w-full px-4 sm:w-[500px]'>
        <CardHeader>
          <div className=' w-full flex px-4 justify-between '>
            {/* <Logo/> */}
            <h3 className='font-jakarta text-2xl font-semibold'>Sign Up</h3>
          </div>
        </CardHeader>


        <CardContent className='flex flex-col gap-6'>
          <div className='flex font-jakarta flex-col gap-4'>
            <Label className='flex flex-col gap-2' htmlFor="company_name">Company Name
              <Input {...register('company_name')} id='company_name' placeholder='Company Name' />
              <div className='text-red-500 '>{errors.company_name?.message}</div>
            </Label>
            <CustomSelect
              name="Industry"
              control={control}
              options={industryOptions}
              placeholder="Please select the industry that applies to you"
            />
            <Label className='flex flex-col gap-2' htmlFor="contract_address">Contract Address
              <Input {...register('contract_address')} id='contract_address' placeholder='Contract Address' />
              <div className='text-red-500 '>{errors.contract_address?.message}</div>
            </Label>
            <Label className='flex flex-col gap-2' htmlFor="email">Email
              <Input {...register('email')} id='email' placeholder='Email' />
              <div className='text-red-500 '>{errors.email?.message}</div>
            </Label>
            <Label className='flex flex-col gap-2' htmlFor="password">Password
              <Input {...register('password')} className='mt-3' id='password' placeholder='Password' />
              <div className='text-red-500 '>{errors.password?.message}</div>
            </Label>
            <Label className='flex flex-col gap-2' htmlFor="confirm_password ">Confirm Password
              <Input {...register('confirm_password')} className='mt-3' id='confirm_password' placeholder='Confirm Password' />
              <div className='text-red-500 '>{errors.confirm_password?.message}</div>
            </Label>

          </div>
          <Button type='submit' className='h-10 text-md font-jakarta'> Sign Up</Button>
        </CardContent>

        <CardFooter className='w-full flex flex-col items-start gap-2' >
          <div className='font-jakarta flex-col items-start  flex sm:flex-row w-full justify-between'>
            <Button variant='Outline'>
              Forgot Password?
            </Button>

            <Button onClick={() => { navigate('/login') }} variant='Outline'>
              Already signed up?
            </Button>
          </div>
          {signupState === true ?
            <Button variant='link' onClick={() => { openMailLink('https://www.gmail.com') }} className='mx-auto font-spaceGrotesk'> Signup Successful, Please Confirm Your Mail </Button> : ''}


        </CardFooter>
      </Card>
    </form>
  )
}

console.log()

export default Signup
