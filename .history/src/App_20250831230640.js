import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MovieCard from "./Components/MovieCard";
import Watch from "./Components/Watch";
import ListFilm from "./Components/ListFilm";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<MovieCard />} />
        <Route path="/watch/:id/:ep" element={<Watch />} />
        <Route path="/search/:keyword" element={<ListFilm />} />
      </Routes>
    </Router>
  );
}

export default App;
