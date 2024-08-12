import { Auth } from '../components/Auth';
import Lightbar from '../components/Lightbar';

export const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-black">
      <div>
        <Auth type="signup"/>
      </div>
      <div className='hidden lg:block'>
        {/* <Quote></Quote> */}
        <Lightbar/>
      </div>
      hehe
    </div>
  );
};
