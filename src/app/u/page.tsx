'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


const Profile =  () => {
  const router = useRouter()
  const {data} = useSession();
  if(!data) return router.push('/signin')
  return (
    <div>{data?.user?.username}</div>
  )
}

export default Profile;