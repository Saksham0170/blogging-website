import React from 'react'

const Quotes = () => {
  return (
    <div className='bg-slate-200 h-screen flex justify-center flex-col'>
        <div className='flex justify-center text-3xl font-bold'>
            <div className='w-2/3'>"The customer service I received was exceptional. The support team went above and beyond to address my concerns"</div>
        </div>
        <div className='flex justify-center mt-5'>
            <div className='w-2/3 text-base font-bold'>Jules Winnfield</div>  
        </div>
        <div className='flex justify-center mt-1'>
            <div className='w-2/3 text-base text-slate-600'>CEO| Acme Inc</div>  
        </div>
    </div>
  )
}

export default Quotes