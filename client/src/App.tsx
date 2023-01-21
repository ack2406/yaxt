import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTest from "./components/add-test/AddTest";
import EditTest from "./components/edit-test/EditTest";
import EditTests from "./components/edit-tests/EditTests";
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
          <Route path="/edit-tests" element={<EditTests />} />
          <Route path="/edit-test/:id" element={<EditTest />} />
          <Route path="/solve-test/:id" element={<SolveTest />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
