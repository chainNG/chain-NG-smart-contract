import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, string } from 'zod';
import { supabase } from '../utils/supabaseClient';
import { toast } from 'sonner';
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import CustomSelect from '../Reusables/CustomSelect';
import imageSrc from '../assets/farm.jpg'; 


const signupSchema = z.object({
  company_name: string().min(6),
  email: string().email(),
  contract_address: string().regex(/^0x[a-fA-F0-9]{40}$/, { message: 'Please input a valid contract address ' }),
  password: string().min(6),
  confirm_password: z.string().min(1, { message: 'Confirm Password is required' }),
}).refine((data) => data.password === data.confirm_password, {
  path: ['confirm_password'],
  message: "Passwords don't match",
});

const Signup = () => {
  const navigate = useNavigate();
  const [signupState, setSignupState] = useState(false);
  const { register, handleSubmit, getValues, control, formState } = useForm({
    resolver: zodResolver(signupSchema),
  });
  const { errors } = formState;

  
  const handleSignUp = async (data) => {
    const { error } = await supabase.auth.signUp({
      email: data?.email,
      password: data?.password,
      options: {
        data: {
          company_name: data?.company_name,
          contract_address: data?.contract_address,
          industry: data?.industry,
        },
      },
    });

    if (!error) {
      setSignupState(true);
      toast('Signup Successful, confirm your mail', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 4000,
        icon: <CheckCircledIcon />,
      });
    } else {
      setSignupState(false);
      toast(error.message, {
        className: 'font-mono text-lg h-[4rem]',
        duration: 4000,
        icon: <CrossCircledIcon />,
      });
    }
  };

  const onSubmitSignup = () => {
    if (Object.keys(errors).length === 0) {
      handleSignUp(getValues());
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100">
      {/* Image for Desktop (left side) */}
      <div className="hidden md:flex w-1/2 h-full">
        <img 
          src={imageSrc} 
          alt="Signup" 
          className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center relative z-10">
        <form onSubmit={handleSubmit(onSubmitSignup)} className="w-full max-w-md">
          <Card className="w-full px-4 sm:w-[500px] bg-white shadow-md rounded-lg">
            <CardHeader>
              <h3 className="font-jakarta text-2xl font-semibold text-center">Register Your Smart contract</h3>
            </CardHeader>

            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <Label htmlFor="company_name">Company Name
                  <Input {...register('company_name')} id="company_name" placeholder="Company Name" />
                  <div className="text-red-500">{errors.company_name?.message}</div>
                </Label>
                <CustomSelect
                  name="Industry"
                  control={control}
                  options={[
                    { value: 'Agriculture', label: 'Agriculture' },
                    { value: 'Logistics', label: 'Logistics' },
                    { value: 'Manufacturing', label: 'Manufacturing' },
                  ]}
                  placeholder="Please select your industry"
                />
                <Label htmlFor="contract_address">Contract Address
                  <Input {...register('contract_address')} id="contract_address" placeholder="Contract Address" />
                  <div className="text-red-500">{errors.contract_address?.message}</div>
                </Label>
                <Label htmlFor="email">Email
                  <Input {...register('email')} id="email" placeholder="Email" />
                  <div className="text-red-500">{errors.email?.message}</div>
                </Label>
                <Label htmlFor="password">Password
                  <Input {...register('password')} id="password" placeholder="Password" />
                  <div className="text-red-500">{errors.password?.message}</div>
                </Label>
                <Label htmlFor="confirm_password">Confirm Password
                  <Input {...register('confirm_password')} id="confirm_password" placeholder="Confirm Password" />
                  <div className="text-red-500">{errors.confirm_password?.message}</div>
                </Label>
              </div>
              <Button type="submit" className="h-10 text-md font-jakarta bg-green-500 text-white rounded-lg hover:bg-green-600">
                Sign Up
              </Button>
            </CardContent>

            <CardFooter className="w-full flex justify-center">
              <Button onClick={() => navigate('/Login')} variant="outline" className="text-sm text-green-500 hover:underline">
                Already have an account?
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>

      {/* Full-page background for Mobile */}
      <div className="absolute inset-0 md:hidden z-0">
        <img 
          src={imageSrc} 
          alt="Signup Background" 
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Signup;
