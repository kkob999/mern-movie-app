import Header from "../components/Header";
import "../App.css";
import MovieCard from "../components/Movie";
export default function IndexPage() {
  return (
    <>
      <main className="px-8">
        <Header/>
        <div className="flex-1 grid grid-cols-4 gap-8">
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
      </main>
    </>
  );
}
