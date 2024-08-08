import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/movie"); // Client-side navigation
  };

  return (
    <header className="flex flex-row py-8 justify-between">
      <h1 className="text-3xl">Movie Review</h1>
      <button
        className="p-1.5 rounded-md bg-blue-600 text-white"
        onClick={handleClick}
      >
        Add Watched Movie
      </button>
    </header>
  );
}
