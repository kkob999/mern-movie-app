

export default function Movie({ title, genres, poster, rating }) {
  
  function ratingStar(star) {
    const arrStar = [];

    for (let i = 0; i < star; i++) {
      arrStar.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-yellow-500"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    return <div className="flex flex-row">{arrStar}</div>;
  }

  return (
    <div
      className="p-2.5 lg:max-w-xs flex flex-col items-center rounded-lg border-solid bg-white shadow-lg bg-clip-padding bg-opacity-60 border border-gray-200"
      style={{
        backdropFilter: "blur(20px)",
        padding: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.5)", // Optional for visibility
      }}
    >
      <div className="flex justify-center items-center mb-2 ">
        <img
          className="h-80 w-auto"
          src={"http://localhost:4000/" + poster}
          alt=""
        />
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="h-14"><h3 className="text-lg font-bold">{title}</h3></div>
        
        <div className="w-full mt-2 flex flex-col items-center">
          {ratingStar(rating)}
          <div className="mt-2 text-sm">{genres}</div>
        </div>
      </div>
    </div>
  );
}
