import React from 'react'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { toast } from 'sonner'
const LoginForm = (handleSubmit,onSubmitLogin,errors,authToggle,setAuthToggle) => {
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

      <CardFooter className='font-jakarta flex-col items-start  flex sm:flex-row w-full justify-between'>
        <Button variant='Outline'>
          Forgot Password?
        </Button>

        <Button onClick={() => { setAuthToggle(!authToggle) }} variant='Outline'>
          Don't have an account?
        </Button>
      </CardFooter>
    </Card>
  </form>
  )
}

export default LoginForm
