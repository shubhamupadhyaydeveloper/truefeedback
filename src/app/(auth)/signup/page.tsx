"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form";
import {Card,CardContent,CardDescription,CardHeader, CardTitle,} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/schemas/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounceCallback } from "usehooks-ts";
import { Loader2 } from "lucide-react";
import axios from 'axios'
import { toast } from "sonner";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type TsignupApiResponse = {
  message : string,
  success : boolean
}

const Signup = () => {
  const [username, setUsername] = useState<string>('');
  const router = useRouter()
  const [backendMessage ,setBackendMessage] = useState<TsignupApiResponse>()
  const debounced = useDebounceCallback(setUsername, 300);
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUniqueUsername = async () => {
          try {
            if(username?.length === 1 || username?.length > 1) {
              const request = axios.get(`/api/check-username?username=${username}`)
              const {data} = await request
              setBackendMessage(data)
            }
          } catch (error) {
            console.log('Error in checkusername')
          }
    }
    checkUniqueUsername()

  },[username])


  const onsubmit = async (data: FieldValues) => {
    try {
      const response = await axios.post('/api/signup',data)
      console.log(response)
      if(response.data.success === true) {
         toast.success(response.data.message)
         router.push(`/verify-username?username=${username}`)
      }
     
    } catch (error:any) {
      console.log('Error in send SignUp api',error)
      toast.error(error?.response.data.message)
    } finally {
      form.reset()
      setUsername('')
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <Card>
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Max" {...field} required 
                   onChange={event => {
                    field.onChange(event)
                    debounced(event.target.value)
                   }}
                  />
                </FormControl>
                 {
                   backendMessage?.success === false ? (
                    backendMessage.message.length > 24 ? (
                      <p className="text-red-600 text-[12.5px]">{backendMessage?.message}</p>
                    ) : (
                      <p className="text-red-600 text-md">{backendMessage?.message}</p>
                    )
                   ) : (
                     username.length == 1 || username.length > 1 &&
                    <p className="text-green-600 text-md">{backendMessage?.message}</p>
                   )
                 }
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="abc@gmail.com" {...field}  required/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} type="password"  required/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
            </Button>
        </form>
      </Form>

      <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
