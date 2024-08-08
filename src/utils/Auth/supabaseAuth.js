import { useForm } from "react-hook-form"
import { supabase } from '../supabaseClient'
import { toast } from 'sonner'
import { ArrowUpIcon, CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { useAuthStore } from "../../services/store/index"

export const handleSignIn = async (data) => {
  
    console.log(data)
    // const { user, error } = await supabase.auth.signIn({
    //   email: 'user@example.com',
    //   password: 'password'
    // })
    // if (error) {
    //     toast.error('Error Signing In', {
    //         className: 'font-mono text-lg h-[4rem]',
    //         duration: 4000,
        
    //       })
    // } else {
    //     toast('Signup Succesful, ', {
    //         className: 'font-mono text-lg h-[4rem]',
    //         duration: 4000,
        
    //       })
    //   const token = user.access_token
    //   // Use the token to authorize the user to access resources in your application
    // }
  }

  export const handleSignUp = async ( data) => {
   
    console.log(data.email)
  
    const { user, error } = await supabase.auth.signUp({
      email: data?.email,
      password:data?.password,
      options:{
       data: {company_name:data?.company_name}
      }
    })
    if (error) {
      console.log('Error signing up:', error.message)
      setSignupState(false)
      
    } else {
      setSignupState(true)
      const token = user.access_token
      // Use the token to authorize the user to access resources in your application
    }
  }