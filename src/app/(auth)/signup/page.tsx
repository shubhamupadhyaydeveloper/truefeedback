'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signupSchema, usernameSchema } from "@/schemas/signupSchema"
import { zodResolver } from '@hookform/resolvers/zod'
import { useDebounceCallback } from 'usehooks-ts'
import { Loader2 } from "lucide-react"
import {toast} from 'sonner'
import {useForm,FieldValues} from 'react-hook-form'
import {z} from 'zod'
import { useState } from "react"

const Signup = () => {

  const [username , setUsername] = useState<string>('')
  const [isCheckingUsername , setIsCheckingUsername] = useState<boolean>(false)
  const debounced = useDebounceCallback(setUsername , 400)
  const {register,handleSubmit,formState : {errors,isSubmitting} , reset} = useForm<z.infer<typeof signupSchema>>({
    resolver : zodResolver(signupSchema)
  })

  const handleForm = (data: FieldValues) => {
       console.log(data)
       reset()
  }

    return (
        <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit(handleForm)}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid">
                <div className="grid gap-2">
                  <Label htmlFor="Username">Username</Label>
                  <Input id="Username" placeholder="Max" required 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                 
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register('email')}
                />
                {errors.email && (<p className="text-red-600 text-md">{errors.email.message}</p>)}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required
                 {...register('password')}
                />
                {errors.password && (<p className="text-red-600 text-md">{errors.password.message}</p>)}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create an account
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/signin" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
        </form>
        </div>
      )
}

export default Signup;