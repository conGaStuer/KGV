import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MovieCard from "./Components/MovieCard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<MovieCard />} />
        <Route path="/watch/:id/:ep" element={<MovieCard />} />
      </Routes>
    </Router>
  );
}

export default App;
