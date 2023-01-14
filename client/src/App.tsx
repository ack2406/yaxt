import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/ui/navbar/Navbar";
import AddTest from "./components/add-test/AddTest";
import Test from "./components/test/Test";
import EditTests from "./components/edit-tests/EditTests";
import EditTest from "./components/edit-test/EditTest";
import Settings from "./components/settings/Settings";

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
          <Route path="/test/:id" element={<Test />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;