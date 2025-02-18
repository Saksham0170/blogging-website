import Avatar from './Avatar'
import { Link } from 'react-router-dom'

const AppBar = () => {
  return (
    <div className='border-b flex justify-between px-10 py-4  border-slate-200'>
      <Link to={'/blogs'}>
        <div className='text-xl font-medium text-black'>
          Blogify
        </div>
      </Link>
      <div>
        <Link to={'/publish'}>     
         <button type="button" className="mr-6 text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2">New</button></Link>
         <Link to={'/'}></Link>
        <Avatar name='Saksham' size={34}></Avatar>
      </div>
    </div>

  )
}

export default AppBar