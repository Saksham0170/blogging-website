import React from 'react'
import Quotes from '../components/quotes'
import Auth from '../components/Auth'
const Signup = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2'>
            <div> <Auth type='signup' /> </div>
            <div >
                <Quotes></Quotes>
            </div>
        </div>
    )
}

export default Signup