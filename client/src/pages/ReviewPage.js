import { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

import "../App.css";

export default function ReviewPage() {
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState("");
  const [rating, setRating] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();
  const { setUserInfo, userInfo } = useContext(UserContext);

  console.log(userInfo.id)

  async function reviewMovie(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("genres", genres);
    data.set("rating", rating);
    data.set("reviewer", userInfo.id)
    data.append("file", files[0]);

    const response = await fetch("http://localhost:4000/movie", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) setRedirect(true);
  }

  if (redirect) return <Navigate to="/" />;

  const goBackBtn = () => {
    return navigate("/");
  };

  return (
    <div className="px-8 max-w-full h-screen flex flex-col justify-center items-center">
      <div className="w-1/2 lg:w-3/4 md:w-3/4 sm:w-full iphone:w-full xs:w-full">
        <button
          onClick={goBackBtn}
          className="flex items-center space-x-2 bg-gray-300 text-black p-2 rounded-lg mb-2 hover:bg-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
          <h1>Go Back</h1>
        </button>
      </div>

      <div className="py-12 bg-white border border-gray-200 rounded-lg shadow w-1/2 flex items-center justify-center lg:w-3/4 md:w-3/4 sm:w-full iphone:w-full xs:w-full sm:px-12 iphone:px-12 xs:px-12">
        <form
          onSubmit={reviewMovie}
          method="POST"
          className="space-y-4 w-full max-w-md "
        >
          <h1 className="text-5xl mb-6 text-center xs:text-3xl">Review Movie</h1>

          <div className="flex flex-col">
            <div className="flex flex-row">
              <label className="mb-1 text-lg mr-1" htmlFor="poster">
                Poster
              </label>
              <p className="text-red-600">*</p>
            </div>

            <input
              type="file"
              onChange={(ev) => setFiles(ev.target.files)}
              required
            />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row">
              <label className="mb-1 text-lg mr-1" htmlFor="title">
                Title
              </label>
              <p className="text-red-600">*</p>
            </div>

            <input
              id="title"
              type="text"
              className="p-2 border rounded-lg w-full"
              placeholder="Title"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row">
              <label className="mb-1 text-lg mr-1" htmlFor="genres">
                Genres
              </label>
              <p className="text-red-600">*</p>
            </div>

            <input
              id="genres"
              type="text"
              className="p-2 border rounded-lg w-full"
              placeholder="Genres"
              value={genres}
              onChange={(ev) => setGenres(ev.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-lg" htmlFor="rating">
              Rating
            </label>
            <input
              id="rating"
              min="1"
              max="5"
              type="number"
              className="p-2 border rounded-lg w-full"
              placeholder="Rating"
              value={rating}
              onChange={(ev) => setRating(ev.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg w-full mt-4 hover:bg-blue-600"
          >
            Review
          </button>
        </form>
      </div>
    </div>
  );
}
