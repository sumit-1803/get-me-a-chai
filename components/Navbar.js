"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
  const { data: session, status } = useSession()
  const [isClient, setIsClient] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <nav className='bg-indigo-800 z-50 fixed top-0 w-full text-white flex justify-between px-4 h-16 items-center'>
      <div>
        <Link className='logo font-bold text-lg flex justify-center items-center' href={"/"}>
          <img src='https://media2.giphy.com/media/KanTM1jNrX7TgQ2d4X/giphy.gif?cid=6c09b952pfgv0n376m7hxzqa4tayg0xkrdk8zgwa1ad4unxp&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s' width={50} alt=''/>
          <span>Get-Me-a-Chai!</span>
        </Link>
      </div>
      <div className='relative'>
        {session ? (
          <>
            <button
              onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
              onClick={() => setShowDropdown(!showDropdown)}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-white mx-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button">
              Hello {session.user.email} 
              <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
              </svg>
            </button>
            <div id="dropdown" className={`z-10 ${showDropdown ? "" : "hidden"} bg-white divide-y left-[125px] absolute divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>
                <li>
                  <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                </li>
                <li>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => signOut()}>Sign out</Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <Link href={"/login"} >
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                login 
              </span>
            </button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
