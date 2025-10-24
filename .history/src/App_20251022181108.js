import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MovieCard from "./Components/MovieCard";
import Watch from "./Components/Watch";
import ListFilm from "./pages/ListFilm";
import Login from "./pages/Authen/Login";
import Register from "./pages/Authen/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<MovieCard />} />
        <Route path="/watch/:id/:ep" element={<Watch />} />
        <Route path="/search/:keyword" element={<ListFilm />} />
        <Route path="/category/:catSlug" element={<ListFilm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
