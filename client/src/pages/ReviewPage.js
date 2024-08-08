import { useState } from "react";
import { Navigate } from "react-router-dom";
// import Header from "../components/Header";

export default function ReviewPage() {
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState("");
  const [rating, setRating] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function reviewMovie(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("genres", genres);
    data.set("rating", rating);

    const response = await fetch("http://localhost:4000/movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,genres,rating
        }),
      });

    console.log(title)

    if (response.ok) setRedirect(true);
  }

  if (redirect) return <Navigate to="/" />;

  return (
    // <div
    //  className="px-8 max-w-full h-screen justify-center items-center flex">
    <form onSubmit={reviewMovie} method="POST">
      <h1 className="">Review Movie</h1>

      <div className="flex flex-row">
        <h3 className="">Title : </h3>
        <input
          type="title"
          className=""
          placeholder="Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
      </div>

      <div className="flex flex-row">
        <h3 className="">genres</h3>
        <input
          type="text"
          className=""
          placeholder="genres"
          value={genres}
          onChange={(ev) => setGenres(ev.target.value)}
        />
      </div>

      <div className="flex flex-row">
        <h3 className="">Rating : </h3>
        <input
          type="number"
          className=""
          placeholder="rating"
          value={rating}
          onChange={(ev) => setRating(ev.target.value)}
        />
      </div>

      <button className="bg-gray-300">Review</button>
    </form>
    // </div>
  );
}
