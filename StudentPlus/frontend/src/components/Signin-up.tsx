import { Link } from 'react-router-dom';

const Signinup = () => {

  return (
    <div style={{
        position: 'relative',
        background: 'white',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '900px',
        minHeight: '200px',
        padding: '70px',
        animation: 'dropTop .3s linear',
        zIndex: 1000,
        color: 'black'
      }}>
      You are not logged in
        <div>
        <Link to="/signIn">
            <button type="button" className="mr-4 text-black bg-white hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-green-300 font-bold rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-2">
            Sign In
            </button>
        </Link>
        <Link to="/signUp">
            <button type="button" className="mr-4 text-black bg-white hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-green-300 font-bold rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-2">
            Sign Up
            </button>
        </Link>
        </div>
    </div>
  );
};

export default Signinup;
