import React from 'react'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { toast } from 'sonner'
const SignupForm = (handleSubmit,onSubmitSignup,errors,authToggle,setAuthToggle) => {
  return (
    <form onSubmit={handleSubmit(onSubmitSignup)}>
    <Card className=' w-full px-4 sm:w-[500px]'>
          <CardHeader>
     <div className=''>
     <h3 className='font-jakarta text-2xl font-semibold'>Sign up</h3>
     </div>
          </CardHeader>


          <CardContent className='flex flex-col gap-6'>
            <div className='flex font-jakarta flex-col gap-4'>
            <Label className='flex flex-col gap-2' htmlFor="company-name ">Company Name
            <Input {...register('company_name')} className='mt-3' id='company-name' placeholder ='Company Name'/>
            </Label>
            <Label className='flex flex-col gap-2' htmlFor="email1">Email
            <Input {...register('signupEmail')}  className='mt-3' id='email1' placeholder ='Email'/>
            </Label>
            <Label className='flex flex-col gap-2' htmlFor="password1 ">Password
            <Input {...register('signupPassword')}  className='mt-3' id='password1'  type="password" placeholder ='Password'/>
            </Label>

            </div>
            <Button type='submit'  className='h-10 text-md font-jakarta'> Sign Up</Button>
          </CardContent>

          <CardFooter className='font-jakarta flex-col items-start  flex sm:flex-row w-full justify-between'>
          <Button variant='Outline'>
          Forgot Password?
          </Button>

          <Button onClick={()=>{setAuthToggle(!authToggle) }} variant='Outline'>
          Already have an account?
          </Button>
          </CardFooter>
        </Card>
    </form>
  )
}

export default SignupForm
