
'use client'
import CityPicker from '@/components/CityPicker'
import { Card,Text,Divider,Subtitle } from '@tremor/react'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#394F68] to-[#086b72] p-10 flex flex-col justify-center items-center'>
      <Card className='max-w-3xl mx-auto'>
         <Text className=" text-5xl font-bold text-center mb-10">Weather Ai</Text>
         <Subtitle className='text-sm text-center'>
            Powered by OpenAI, Next.js, 13.4, Tailwind CSS, Tremor 3.0 + more!
          </Subtitle>
          <Divider className='my-10'/>
          <Card className='bg-gradient-to-br from-[#394F68] to-[#086b72]'>
            <CityPicker/>
          </Card>
      </Card>
    </div>
  )
}
