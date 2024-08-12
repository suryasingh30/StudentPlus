import { Link } from "react-router-dom";

export const Appbar = () => {
    return (
        <div
            className="fixed top-0 left-0 right-0 z-50 border-b flex justify-between px-10 py-2"
            style={{
                backgroundColor: '#343434',
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)' // Adjust the color and spread as needed
            }}
            >
            <Link to={'/blogs'} className="flex items-center cursor-pointer text-black">
                <img
                    src="/logo.png"
                    alt="StudentPlus"
                    className="h-9 w-auto" 
                />
            </Link>
            <div>
                <Link to={`/signIn`}>
                    <button type="button" className="mr-4 text-black bg-white hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-green-300 font-bold rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-2 ">SignIn</button>
                </Link>
                <Link to={`/signUp`}>
                    <button type="button" className="mr-4 text-white bg-blue-700 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">SignUp</button>
                </Link>
            </div>
        </div>
    );
};
