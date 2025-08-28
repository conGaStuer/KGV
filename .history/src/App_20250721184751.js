import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
function App() {
  return (
    <Route>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Route>
  );
}

export default App;
