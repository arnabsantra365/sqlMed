
import { Link } from 'react-router-dom';
import Button from '../components/Button'

const Home = () => {
   
  return (
    <div className='flex justify-center mt-24 gap-x-5'>
      <Link to={`form/A`} className="forma cursor-pointer text-white"   >
        <Button data={'A'}   />
      </Link>
      <Link  to={`form/B`} className="formb cursor-pointer text-white">
        <Button data={'B'}  />
      </Link>
    </div>
  )
}

export default Home
