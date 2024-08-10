import Header from "../components/Header";
import "../App.css";
import { useEffect, useState } from "react";
import Movie from "../components/Movie";

export default function IndexPage() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000`).then((response) => {
      response.json().then((movie) => {
        // console.log(movie)
        setMovie(movie);
      });
    });
  }, []);

  return (
    <>
      <main className="bg-gray-100 pb-8 min-h-screen">
        <Header />
        <div className="px-8 flex-1 grid grid-cols-5 gap-8 mt-8">
          {movie.length > 0 ? movie.map((mv) => <Movie {...mv} />) : (<div>Add Reviewed Movie</div>)}
        </div>
      </main>
    </>
  );
}
