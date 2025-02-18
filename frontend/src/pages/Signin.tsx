import React from 'react'
import Auth from '../components/Auth'
import Quotes from '../components/quotes'

const Signin = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2'>
            <div> <Auth type='signin' /> </div>
            <div >
                <Quotes></Quotes>
            </div>
        </div>
    )
}

export default Signin