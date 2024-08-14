import Auth from '../components/Auth';

export const Signin = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className='relative top-[130px]'>
        <BubbleText />
      </div>
      <div className='flex-col items-center justify-center text-white relative top-[160px]'>
        <h2 className='text-center max-w-screen-md mb-6'>StudentPlus is your go-to platform for navigating college life anonymously. Connect with fellow students, discuss academic pressures, and explore campus trends without revealing your identity. StudentPlus is built to help you stay informed and engaged while preserving your privacy.</h2>
      </div>
      <Auth type="signin" />
      
      {/* Inline CSS */}
      <style>{`
        .hoverText {
          transition: 0.35s font-weight, 0.35s color;
        }

        .hoverText:hover {
          font-weight: 900;
          color: rgb(238, 242, 255);
        }

        /* To the right */
        .hoverText:hover + .hoverText {
          font-weight: 500;
          color: rgb(199, 210, 254);
        }
Waiting for pgAdmin 4 to start...
        .hoverText:hover + .hoverText + .hoverText {
          font-weight: 300;
        }

        /* To the left */
        .hoverText:has(+ .hoverText:hover) {
          font-weight: 500;
          color: rgb(199, 210, 254);
        }

        .hoverText:has(+ .hoverText + .hoverText:hover) {
          font-weight: 300;
        }
      `}</style>
      <div className='text-white pb-3'>© 2024 | Designed and Developed by Suryanarayan Singh</div>
    </div>
  );
};

const BubbleText = () => {
  return (
    <h2 className="text-center text-6xl font-thin text-indigo-300 mb-8">
      {"StudentPlus".split("").map((child, idx) => (
        <span className="hoverText" key={idx}>
          {child}
        </span>
      ))}
    </h2>
  );
};

export default Signin;
