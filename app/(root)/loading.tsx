import React from 'react'
import Image from 'next/image'

const loading = () => {
  return (
    <div style={{backgroundColor: 'transparent'}} className=''>
        <div className='flex-center mt-10 flex h-full' style={{backgroundColor: "redd", padding: "0 10px"}}>
            <Image className='text-red' src="/assets/icons/loader-brand.svg" alt='Loading...' height={40} width={40} />
        </div>
    </div>
  )
}

export default loading