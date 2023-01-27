import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTest from "./components/add-test/AddTest";
import Home from "./components/home/Home";
import Settings from "./components/settings/Settings";
import SolveTest from "./components/solve-test/SolveTest";
import Navbar from "./components/ui/navbar/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-test" element={<AddTest />} />
          <Route path="/solve-test/:id" element={<SolveTest />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
