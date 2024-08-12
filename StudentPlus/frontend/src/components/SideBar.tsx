import { useEffect, useState } from "react";
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
import axios from "axios";

interface UserDetail {
    shortCollegeName: string;
    fullCollegeName: string;
}

export const SideBar = () => {

    const [userDetail, setUserDetail] = useState<UserDetail | null>(null);

    useEffect(() => {
        const fetchUserDetail = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8787/api/v1/blog/userDetails', {
                    headers: {
                        Authorization: localStorage.getItem("token") || ""
                    }
                });
                setUserDetail(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };
        fetchUserDetail();
    }, []);

    return (
        <div className="sidebar">
            <div className="flex flex-col items-center">
                <Avatar name={userDetail?.fullCollegeName || 'U'} size="big" />
                <h3 className="mt-2 text-lg font-semibold text-white">
                    {userDetail?.shortCollegeName || 'College'}
                </h3>
                <p className="text-sm text-gray-400">
                    {userDetail?.fullCollegeName || 'Full College Name'}
                </p>
            </div>

            <Link to={'/blog/likedPosts'}>
                <button type="button" className="sidebar-button">Liked</button>
            </Link>

            <Link to={'/saved'}>
                <button type="button" className="sidebar-button">Saved Posts</button>
            </Link>

            <Link to={'/myCollege'}>
                <button type="button" className="sidebar-button">My College</button>
            </Link>

            <div className="spacer"></div>

            <Link to={'/signOut'}>
                <button type="button" className="sidebar-button">Sign Out</button>
            </Link>
        </div>
    );
};
