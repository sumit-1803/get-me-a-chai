"use client"

import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';

const Login = () => {
  const { data: session, status } = useSession()

  if (session) {

    const router = useRouter()
    router.push('/dashboard')

  }
  return (
    <div className='text-white animate-fadeIn py-14 container mx-auto flex items-center justify-center min-h-screen'>
      <div className='text-center'>
        <h1 className='font-bold text-3xl mb-8'>
          Login/SignUp to get Your Fans to Support you
        </h1>

        <div className='social-login-buttons gap-2'>
          <button
            onClick={() => signIn("github")}
            type="button"
            className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
          >
            <FaGithub size={22} className='me-2' />
            Sign in with Github
          </button>
        </div>
      </div>
    </div>

  )
}

export default Login;
