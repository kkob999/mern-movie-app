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
      console.log(userInfo);
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
    <header className="flex flex-row p-8 justify-between bg-white ">
      <Link to="/">
        <h1 className="text-3xl font-bold text-blue-500">Movie Review</h1>
      </Link>

      {username ? (
        <div className="space-x-5">
          <button
            className="p-1.5 rounded-md bg-blue-600 text-white"
            onClick={handleClick}
          >
            Add Watched Movie
          </button>
          
          <a onClick={logout}><Link to="/logout" >Logout</Link></a>
        </div>
      ) : (
        <nav className="space-x-5">
          <Link to="/login">Login</Link>
          <Link to="/register">Registor</Link>
        </nav>
      )}
    </header>
  );
}
