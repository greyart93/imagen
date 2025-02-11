'use client'
import { Post } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { BiLoaderCircle } from 'react-icons/bi'
import { AnimatePresence, motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Page = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: session, status } = useSession()
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(true)
    const [posts, setPosts] = useState<Post[]>([])

    // Redirect to home if user is not authenticated
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.replace('/')
        }
    }, [status, router])

    const fetchPosts = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/image')
            const data = await response.json()
            console.log(data)
            setPosts(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (status === 'authenticated') {
            fetchPosts()
        }
    }, [status])

    if (status === 'loading') {
        return (
            <div className="w-full min-h-dvh flex justify-center items-center">
                <BiLoaderCircle className='animate-spin text-[30px]' />
                <p className='text-[20px]'>Loading...</p>
            </div>
        )
    }

    if (status === 'unauthenticated') {
        return null // Redirecting, so no need to render anything
    }

    return (
        <div className='w-full min-h-dvh p-3 pt-[72px] grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3'>
            {loading ? (
                <div className="col-span-full flex justify-center items-center flex-col">
                    <BiLoaderCircle className='animate-spin text-[30px]' />
                    <p className='text-[20px]'>Loading...</p>
                </div>
            ) : (
                <AnimatePresence mode="wait">
                    {posts.map((post, index) => (
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.9,
                                filter: "blur(10px)"
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                filter: "blur(0px)"
                            }}
                            transition={{
                                duration: 0.2,
                                delay: index * 0.3
                            }}
                            className='w-full h-full p-2.5 border rounded-md' key={post.id}
                        >
                            <Image
                                alt={post.prompt}
                                src={post.url}
                                width={250}
                                height={250}
                                className='object-contain w-full rounded-md'
                            />
                            <p className='text-white/80'>{post.prompt}</p>
                        </motion.div>
                    ))}
                </AnimatePresence>
            )}
        </div>
    )
}

export default Page
