import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errAleart, setErrAleart] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [createAleart, setCreateAleart] = useState(false);

  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  async function register(ev) {
    ev.preventDefault();

    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 201) {
      setCreateAleart(true);
      setRedirect(true);
    } else {
      const errorData = await response.json();
      const errMsg = errorData["message"];
      if (errMsg.includes("duplicate key")) {
        console.log("dup key");
        setErrAleart(true);
        setErrMsg("This username is already taken.");
      }
    }
  }

  if (redirect) navigate("/");

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex justify-center items-center px-8">
        {createAleart && (
          <div
            class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
            role="alert"
          >
            <div class="flex">
              <div>
                <p class="font-bold">Create user successfully</p>
              </div>
            </div>
          </div>
        )}
        {errAleart && (
          <div
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded  "
            role="alert"
          >
            <strong class="font-bold">{errMsg}</strong>
          </div>
        )}
        {/* Form */}
        <div className="py-12 bg-white border border-gray-200 rounded-lg shadow w-1/3 flex items-center justify-center">
          <form onSubmit={register} className="space-y-4 w-full max-w-sm">
            <h1 className="font-bold text-2xl">Register</h1>
            <div className="flex flex-col">
              <label>Username</label>
              <input
                type="text"
                className="p-2 border rounded-lg w-full"
                onChange={(ev) => setUsername(ev.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label>Password</label>
              <input
                type="password"
                className="p-2 border rounded-lg w-full"
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>
            <button className="p-2 bg-blue-500 rounded-lg text-white w-full">
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
