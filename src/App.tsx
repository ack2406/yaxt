import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/ui/navbar/Navbar";
import AddTest from "./components/add-test/AddTest";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-test" element={<AddTest />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
