"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
//   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createAccount, signInUser } from '@/lib/actions/user.actions'
import OTPModal from './OTPModal'


 

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
    return z.object({
        email: z.string().email(),
        fullName: formType==='sign-up'?z.string().min(5).max(50): z.string().optional(),
    })
}

const AuthForm = ({type}: {type: FormType}) => {
    const [isLoading, setisLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [accountId, setAccountId] = useState(null)
    
    const formSchema = authFormSchema(type);
        
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: ""
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setisLoading(true);
    setErrorMessage('');
    
    try {
        const user = type==='sign-up'? 
        await createAccount({
            fullName: values.fullName || "",
            email: values.email,
        }) 
        : await signInUser({email: values.email});

        console.log("userrrrr", user);
        
        setAccountId(user.accountId)
    } catch {
        setErrorMessage("Failed to create account. Please try again")
    } finally {
        setisLoading(false);
    }

    console.log(values)
  }


  return (
    <>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">

            <h1 className='form-title'>{type === "sign-in"?"Sign In": "Sign Up"}</h1>
            
            {type==='sign-up' && (
                <>
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <div className='shad-form-item'>
                                    <FormLabel className='shad-form-label'>Full Name</FormLabel>

                                    <FormControl>
                                        <Input placeholder="Enter your full name" className='shadow-input' {...field} />
                                    </FormControl>
                                    <FormMessage className='shad-form-message' />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <div className='shad-form-item'>
                                    <FormLabel className='shad-form-label'>Email</FormLabel>

                                    <FormControl>
                                        <Input placeholder="Enter your email" className='shadow-input' {...field} />
                                    </FormControl>
                                    <FormMessage className='shad-form-message' />
                                </div>
                            </FormItem>
                        )}
                    />
                </>
            )}

            {type==='sign-in' && (
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <div className='shad-form-item'>
                                <FormLabel className='shad-form-label'>Email</FormLabel>

                                <FormControl>
                                    <Input placeholder="Enter your email" className='shadow-input' {...field} />
                                </FormControl>
                                <FormMessage className='shad-form-message' />
                            </div>
                        </FormItem>
                    )}
                />
            )}

            <Button className='form-submit-button' type="submit" disabled={isLoading}>
                {type==='sign-in'? "Sign In": "Sign Up"}
                {isLoading && (
                    <Image src="/assets/icons/loader.svg" alt="loader" height={24} width={24} className='ml-2 animate-spin'></Image>
                )}
            </Button>
            
            {errorMessage && (
                <p className='error-message'> *{errorMessage}</p>
            )}

            <div className='body-2 flex justify-center'>
                <p className='text-light-100'>
                    {type==='sign-in'? "Don't have an account?": "Already have an account?"}
                    <Link className='ml-1 font-medium text-brand' href={type==='sign-in'? "/sign-up" : "/sign-in"}>{type==='sign-in'? "Sign Up" : "Sign In"}</Link>
                </p>
            </div>

        </form>
        </Form>

        {/* OTP Verification */}

        {accountId && <OTPModal email={form.getValues('email')} accountId={accountId} />}
    </>
  )
}

export default AuthForm