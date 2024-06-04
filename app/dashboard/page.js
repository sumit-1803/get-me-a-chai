"use client"
import React from 'react'
import { useRouter } from 'next/router'
import { useSession,signIn,signOut } from 'next-auth/react'

const dashboard = () => {
  const {data:session} = useSession()

  if (!session){
    const router = useRouter()
    router.push("/login")
  }
  if (session){
    const router = useRouter()
    router.push("/dashboard")
  }

  return (
    <div>
      Dashboard
    </div>
  )
}

export default dashboard
