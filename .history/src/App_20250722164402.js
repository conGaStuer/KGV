import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MovieCard from "./Components/MovieCard";
import Watch from "./Components/Watch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<MovieCard />} />
        <Route path="/watch/:id/:ep" element={<Watch />} />
      </Routes>
    </Router>
  );
}

export default App;
