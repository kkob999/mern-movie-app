import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Layout from "./components/Layout";
import ReviewPage from "./pages/ReviewPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { UserContext, UserContextProvider } from "./UserContext";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/movie" element={<ReviewPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
