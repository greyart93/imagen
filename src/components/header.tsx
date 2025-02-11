"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { BiLoaderCircle } from "react-icons/bi"

const Header = () => {
  const [initialLoding, setInitialLoading] = useState<boolean>(true)
  const { data: session, status } = useSession();
  useEffect( ()=> {
    if (status !== 'loading') {
      setInitialLoading(false)
    }
  },[status, session])
  return (
    <div
    className='fixed top-0 left-0 w-full h-[60px] bg-black border-b border-white/20 p-3 flex justify-between items-center z-50'>
        <Link href='/'>
        <h2
        className='font-bold text-xl'
        >ImaGen</h2>
        </Link>
        { initialLoding && status === "loading"  ? <BiLoaderCircle className='animate-spin' /> :!session ? 
        <div className='__menu'>
            <Button onClick={() => signIn('google') }>Log in</Button>
        </div> :
        <div className="flex gap-3 justify-center items-center">
          <Button variant="destructive"
          onClick={() => signOut({callbackUrl:'/', redirect:true})}
          >Logout</Button>
          <Link href='/profile'>
         <Avatar>
          <AvatarImage src={session.user?.image || ''} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar> </Link>
        </div> }
        </div>
  )
}

export default Header
