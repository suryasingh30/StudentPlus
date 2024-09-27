import { useEffect, useState } from "react";
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "./config";

interface UserDetail {
  shortCollegeName: string;
  fullCollegeName: string;
}

export const SideBar = () => {
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [flag, setFlag] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}api/v1/blog/userDetails`, {
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

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token === null || token === "") {
        setFlag(true);
      } else {
        setFlag(false);
      }
    } catch (error) {
      console.error("Error checking token in localStorage:", error);
    }
  }, []);

  const logOutUser = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
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

        <Link to={'/contact'}>
          <button type="button" className="sidebar-button">Contact Me</button>
        </Link>

        <div className="spacer"></div>

        {!flag && (
          <Link to={'/blogs'}>
            <button type="button" 
                    className="sidebar-button"
                    onClick={logOutUser}
            >Sign Out</button>
          </Link>
        )}
      </div>
      
      <div
        className="sidebar-indicator"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </div>
    </>
  );
};
