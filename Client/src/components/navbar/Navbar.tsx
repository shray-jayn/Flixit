import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ArrowDropDown, Notifications, Search } from "@mui/icons-material";
import { userState } from "../../recoil/atoms/authAtom";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset !== 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt="Netflix Logo"
          />

          <Link to="/" className="link">
            <span>Homepage</span>
          </Link>

          <Link to="/series" className="link">
            <span className="navbarmainLinks">Series</span>
          </Link>

          <Link to="/movies" className="link">
            <span className="navbarmainLinks">Movies</span>
          </Link>

          <span>New and Popular</span>
          <span>My List</span>
        </div>

        <div className="right">
          <Search className="icon" />
          <span>KID</span>
          <Notifications className="icon" />

          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="User Avatar"
          />

          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={handleLogout}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
