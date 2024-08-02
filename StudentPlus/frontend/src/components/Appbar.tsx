import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'} className="flex items-center cursor-pointer text-black">
                <img
                    src="/profile.png" // Replace with the path to your logo image
                    alt="StudentPlus"
                    className="h-28 w-auto" // Adjusted size for a shorter image
                />
            </Link>
        <div>
            <Link to={`/signIn`}>
                <button type="button" className="mr-4 text-black bg-white hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-green-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">SignIn</button>
            </Link>
            <Link to={`/signUp`}>
                <button type="button" className="mr-4 text-white bg-blue-700 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">SignUp</button>
            </Link>

            <Avatar size={"big"} name="harkirat" />
        </div>
    </div>
}