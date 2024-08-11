import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";

export default function Header() {
  const navigate = useNavigate();

  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/user", {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
      // console.log(userInfo);
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    navigate("/");
  }

  const handleClick = () => {
    navigate("/movie");
  };

  const username = userInfo?.username;

  return (
    <header className="flex flex-row p-8 justify-between bg-white iphone:py-4 xs:py-4 md:py-6 lg:py-6 items-center">
      <Link to="/">
        <h1 className="text-3xl font-bold text-blue-500 iphone:text-base lg:text-2xl md:text-2xl">Movie Review</h1>
      </Link>

      {username ? (
        <div className="space-x-5">
          <button
            className="p-1.5 rounded-md bg-blue-600 text-white iphone:text-xs xs:text-xs lg:text-lg md:text-lg"
            onClick={handleClick}
          >
            Add Watched Movie
          </button>
          
          <a onClick={logout} className="iphone:text-xs xs:text-xs lg:text-lg md:text-lg"><Link to="/logout" >Logout</Link></a>
        </div>
      ) : (
        <nav className="space-x-5 iphone:text-xs xs:text-xs lg:text-lg md:text-lg">
          <Link to="/login">Login</Link>
          <Link to="/register">Registor</Link>
        </nav>
      )}
    </header>
  );
}
