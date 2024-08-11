import Header from "../components/Header";
import "../App.css";
import { useEffect, useState } from "react";
import Movie from "../components/Movie";

export default function IndexPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000`)
      .then((response) => response.json())
      .then((data) => {
        const uniqueTitles = new Map(); // Use Map to handle title and rating

        // Aggregate ratings by movie title
        data.forEach((movie) => {
          if (!uniqueTitles.has(movie.title)) {
            uniqueTitles.set(movie.title, {
              ...movie,
              totalRating: movie.rating,
              count: 1,
            });
          } else {
            const movieData = uniqueTitles.get(movie.title);
            uniqueTitles.set(movie.title, {
              ...movieData,
              totalRating: movieData.totalRating + movie.rating,
              count: movieData.count + 1,
            });
          }
        });

        // Create a list of movies with the average rating
        const uniqueMovies = Array.from(uniqueTitles.values()).map((movie) => ({
          ...movie,
          averageRating: movie.totalRating / movie.count,
        }));

        console.log("Unique Movies:", uniqueMovies);
        setMovies(uniqueMovies);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <>
      <main className="bg-gray-100 pb-8 min-h-screen">
        <Header />
        <div className="px-8 flex justify-center items-center mt-8">
          <div className="grid grid-cols-5 gap-8 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 iphone:grid-cols-1 xs:grid-cols-1">
            {movies.length > 0 ? (
              movies.map((mv) => <Movie key={mv.title} {...mv} />)
            ) : (
              <div>Add Reviewed Movie</div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
