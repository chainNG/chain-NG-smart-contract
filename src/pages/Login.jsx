import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, string } from 'zod';
import { useAuthStore } from '../services/store/index';
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/farm.jpg'; 

const signupSchema = z.object({
  email: string().email(),
  password: string().min(6, { message: 'Password must contain at least 6 characters' }),
});

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(signupSchema),
  });
  const { errors } = formState;

  const handleSignIn = async (data) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data?.email,
      password: data?.password,
    });

    if (error) {
      toast.error('Error Signing In', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 4000,
        icon: <CrossCircledIcon />,
      });
    } else {
      toast.success('Login Successful', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 4000,
        icon: <CheckCircledIcon />,
      });

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    }
  };

  const onSubmitLogin = (data) => {
    handleSignIn(data);
  };

  return (
    <div className="min-h-screen flex lg:flex-row flex-col bg-gray-100">
      {/* Left side: Image */}
      <div className="lg:w-1/2 w-full h-full object-cover relative overflow-hidden">
        <img
          src={loginImage}
          alt="Login"
          className=" object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Right side: Centered Login form */}
      <div className="lg:w-1/2  flex justify-center items-center bg-gray-100">
        <form onSubmit={handleSubmit(onSubmitLogin)} className="w-full max-w-lg p-8">
          <Card className="w-full px-6 py-8 sm:w-full bg-white shadow-md rounded-lg">
            <CardHeader className="text-center">
              <h3 className="font-jakarta text-2xl font-semibold">Sign In</h3>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <Label className="flex flex-col gap-2" htmlFor="email">Email
                  <Input {...register('email')} id="email" placeholder="Email" />
                  <div className="text-red-500">{errors.email?.message}</div>
                </Label>

                <Label className="flex flex-col gap-2" htmlFor="password">Password
                  <Input {...register('password')} id="password" placeholder="Password" />
                  <div className="text-red-500">{errors.password?.message}</div>
                </Label>
              </div>
              <Button type="submit" className="h-10 text-md font-jakarta bg-green-500 text-white rounded-lg hover:bg-green-600">
                Sign In
              </Button>
            </CardContent>

            <CardFooter className="w-full flex flex-col items-start gap-4 mt-4">
              <div className="flex w-full justify-between">
                <Button variant="outline" className="text-sm text-green-500 hover:underline">Forgot Password?</Button>
                <Button onClick={() => navigate('/Signup')} variant="outline" className="text-sm text-green-500 hover:underline">Don't have an account?</Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default Login;
