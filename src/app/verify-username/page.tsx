"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { verifySchema } from "@/schemas/verifySchema";
import axios from 'axios'
import { toast } from "sonner";

const page = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });
  const username = useSearchParams().get("username");


  const hadleForm = async (data :FieldValues) => {
   try {
     const payload = {username , verifycode : data.code}
     const response = await axios.post('/api/verify-code',payload)
     console.log(response)
     if(response.data.success === true) {
       toast.success(response.data.message)
     } 
     router.push('/signin')
   } catch (error:any) {
     console.log('Error in verifycode')
     toast.error(error.response.data.message)
   } finally {
    reset()
   }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Verify Email</CardTitle>
          <CardDescription>
            Enter your code to verify email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(hadleForm)}>
            <div className="grid mb-4">
              <div className="grid gap-2">
                <Input
                  type="text"
                  required
                  placeholder="enter your code"
                  {...register("code")}
                />
                {errors?.code && (
                  <p className="text-red-600 text-md">{errors.code.message}</p>
                )}
              </div>
            </div>
            <Button type="submit" className="mt-4" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
