import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Layout from "./components/Layout";
import ReviewPage from "./pages/ReviewPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />}/>
      <Route path="/movie" element={<ReviewPage />} />
    </Routes>
  );
}

export default App;
