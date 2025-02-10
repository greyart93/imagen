'use client'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from 'next/image'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
    prompt: z.string().min(7, {message: "Prompt must be 7 characters long"}),
})
 

const Page = () => {
    const [outputImg, setOutputImg] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            setLoading(true)
            const response = await fetch("api/image", {
            method: "POST",
            body: JSON.stringify(values),

        })
        const data = await response.json()
        if(response.status == 200) {
        // console.log(data)
        console.log(data.url)
        setOutputImg(data.url)
        // console.log(values.prompt)
        }
        else {
          console.log(data.error)
          toast({variant:"destructive", description:data.error})
        }
        
        
    } catch(error){
        console.log(error)
    } finally {
        setLoading(false)
    }
    }

  return (
    <div   
    className='w-full h-dvh flex justify-center items-center pt-[60px] flex-col'
    >
        <div className='w-full  p-3 '>
            <h1 className='text-center font-bold text-white text-4xl'>
                Create
            </h1>
            <p className='text-white/60 text-center'>Generate Image from text</p>
        </div>
        <div className='flex  w-full gap-3 h-full lg:flex-row flex-col'>
            <div className="__form flex-[2] gap-2  flex justify-center items-start flex-col pl-2">
                <p className='text-center w-full lg:text-left text-white/70'>Type you prompt below to create any image you can imagine!</p>
                <div className='flex gap-2 w-full  '>
                <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex gap-2 p-2">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem className='w-full max-w-full lg:max-w-[70%]'>
              <FormControl>
              <Input  placeholder='a cat sitting over a sofa...'
                className=' transition-all border-white'
                {...field}
                />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button loading={loading} type="submit">Generate</Button>
      </form>
    </Form>    
                
         </div>
            </div>

            <div className="__output flex-[1] bg-white/5 rounded-md relative m-6">
      { outputImg ? (   <Image
      className='w-full h-full object-contain'
      alt="outputImg" src={outputImg} width={300} height={300} /> )
    : ( 
        <><div className='w-full h-full flex justify-center items-center text-white/60 text-center p-3 overflow-hidden'>
            Enter your prompt and hit generate!
            </div></>
    )
     }
            </div>
        </div>
    </div> 
  )
}

export default Page